import { Storage, get_current_period, get_current_thread, send_message, generate_event, Context } from "massa-sc-std";

const dim: i16 = 100;
const threads: u8 = 32;

// set the state of a dot
export function set_dots(_args: string): void {
    let splt = _args.split('/');
    let state = Storage.get_data("state");
    for(let i=0 ; i < splt.length ; ++i) {
        let splt2 = splt[i].split("=");
        let index = i32(parseInt(splt2[0]));
        let value = (splt2[1] == "1");
        state = state.substring(0, index) + (value ? '1' : '0') + state.substring(index+1);
        generate_event("gol SC set " + index.toString() + " => " + value.toString());
    }
    Storage.set_data("state", state);
}

// convert coordinates to index
function x_y_to_i(x: i16, y: i16): u16 {
    while(x < 0) {
        x += dim;
    }
    while(y < 0) {
        y += dim;
    }
    while(x >= dim) {
        x -= dim;
    }
    while(y >= dim) {
        y -= dim;
    }
    return u16((y*dim) + x);
}

export function stop(_args: string): void {
    Storage.set_data("last_slot_index", "2000000000");
}

export function start(_args: string): void {
    Storage.set_data("last_slot_index", "0");
}

export function advance(_args: string): void {
    generate_event("gol SC update started");

    // check that the current slot index is strictly higher than the last time we were called
    let last_slot_index: u64 = u64(parseInt(Storage.get_data_or_default("last_slot_index", "0")));
    let cur_period = get_current_period();
    let cur_thread = get_current_thread();
    let cur_slot_index: u64 = u64(cur_period)*u64(threads) + u64(cur_thread);
    if(cur_slot_index <= last_slot_index) {
        return;
    }
    Storage.set_data("last_slot_index", cur_slot_index.toString());

    // load current state or reset to default
    if(!Storage.has_data("state")) {
        Storage.set_data("state", "0".repeat(dim*dim));
    }
    let state = Storage.get_data("state");

    // compute new state
    let new_state: String[] = [];
    for(let y: i16=0 ; y < dim ; ++y) {
        for(let x: i16=0 ; x < dim ; ++x) {
            let i = x_y_to_i(x, y);

            // count live neighbors
            let live_neighbors: u8 = 0;
            for(let dy: i16=-1 ; dy <= +1 ; ++dy) {
                for(let dx: i16=-1 ; dx <= +1 ; ++dx) {
                    if(dx == 0 && dy == 0) { continue; }
                    if(state.charAt(x_y_to_i(x+dx,y+dy)) == '1') {
                        ++live_neighbors;
                    }
                }
            }
            
            // update states
            let res_char = '0';
            if(state.charAt(i) == '1') {
                // currently alive
                if(live_neighbors != 2 && live_neighbors != 3) {
                    // make dead
                    res_char = '0';
                } else {
                    // keep alive
                    res_char = '1';
                }
            } else {
                // currently dead
                if(live_neighbors == 3) {
                    // make alive
                    res_char = '1';
                } else {
                    // keep dead
                    res_char = '0';
                }
            }

            new_state.push(res_char);
        }
    }

    // save states
    Storage.set_data("state", new_state.join(''));

    // emit wakeup message
    let next_thread = cur_thread + 1;
    let next_period = cur_period;
    if(next_thread >= threads) {
        ++next_period;
        next_thread = 0;
    }
    let call_stack = Context.get_call_stack();
    let cur_addr = call_stack[call_stack.length - 1];
    send_message(
        cur_addr,
        "advance",
        next_period,
        next_thread,
        next_period + 5,
        next_thread,
        70000000,
        0,
        0,
        ""
    );

    generate_event("gol SC update finished");
}
