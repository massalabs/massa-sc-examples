/* DNS Implementation for Massa Labs
 *
 * */
import { Storage, Context, print } from "massa-sc-std";
import { JSON } from "json-as";

@json
export class SetOwnerArgs {
    name: string = "";
    owner: string = "";
}

/**
 * Transfers ownership of a name to a new address. May only be called by the current owner of the name.
 * @param name The name to transfer ownership of.
 * @param owner The address of the new owner.
 */
export function setOwner(_args: string): void {
    const args = JSON.parse<SetOwnerArgs>(_args);
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const node_owner = owner(args.name);
    const msg_sender = addresses[addresses.length - 2]
    const is_approved = JSON.parse<bool>(isApprovedForAll(JSON.stringify<IsApprovedForAllArgs>({owner: node_owner, operator: msg_sender})));
    if (msg_sender == node_owner || is_approved) {
        Storage.set_data(_ownerKey(args.name), args.owner);
    }
}

@json
export class SetResolverArgs {
    name: string = "";
    address: string = "";
}

/**
 * Sets the resolver address for the specified name. May only be called by the current owner of the name.
 * @param name The name to update.
 * @param resolver The address of the resolver.
 */
export function setResolver(_args: string): void {
    const args = JSON.parse<SetResolverArgs>(_args);
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const node_owner = Storage.get_data_or_default(_recordKey(args.name), Storage.get_data("OWNER"));
    const msg_sender = addresses[addresses.length - 2]
    const is_approved = JSON.parse<bool>(isApprovedForAll(JSON.stringify<IsApprovedForAllArgs>({owner: node_owner, operator: msg_sender})));
    if (msg_sender == node_owner || is_approved) {
        Storage.set_data(_recordKey(args.name), args.address);
    }
}

/**
 * Returns the address of the resolver for the specified name.
 * @param name The specified name.
 * @return address of the resolver.
 */
export function resolver(name: string): string {
    return Storage.get_data_or_default(_recordKey(name), "0");
}

/**
 * Returns the address that owns the specified name.
 * @param name The specified name.
 * @return address of the owner.
 */
export function owner(name: string): string {
    return Storage.get_data_or_default(_recordKey(name), Storage.get_data("OWNER"));
}

@json
export class SetApprovalForAllArgs {
    operator: string = "";
    approved: bool = 0;
}

/**
 * Enable or disable approval for a third party ("operator") to manage
 *  all of `msg_sender`'s DNS records.
 * @param operator Address to add to the set of authorized operators.
 * @param approved True if the operator is approved, false to revoke approval.
 */
export function setApprovalForAll(_args: string): void {
    const args = JSON.parse<SetApprovalForAllArgs>(_args);
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const msg_sender = addresses[addresses.length - 2];
    const key = _approveKey(msg_sender, args.operator);
    Storage.set_data(key, JSON.stringify(args.approved));
}

@json
export class IsApprovedForAllArgs {
    owner: string = "";
    operator: string = "";
}

/**
 * Query if an address is an authorized operator for another address.
 * @param owner The address that owns the records.
 * @param operator The address that acts on behalf of the owner.
 * @return True if `operator` is an approved operator for `owner`, false otherwise.
 */
export function isApprovedForAll(_args: string): string {
    const args = JSON.parse<IsApprovedForAllArgs>(_args);
    const key = _approveKey(args.owner, args.operator);
    return Storage.get_data_or_default(key, JSON.stringify(false));
}

/**
 * Returns whether a record has been imported to the registry.
 * @param name The specified name.
 * @return 1 if record exists
 */
export function recordExists(name: string): string {
    if (Storage.get_data_or_default(_recordKey(name), "0") == "0") {
        return "0"
    };
    return "1";
}

function _recordKey(address: string): string {
    return "record" + address;
}

function _ownerKey(address: string): string {
    return "owner" + address;
}

function _approveKey(address: string, operator: string): string {
    return "approve" + address + operator;
}

// TODO
// function setSubnodeOwner(bytes32 node, bytes32 label, address owner) external;

// function recordExists(bytes32 node) public view returns (bool);