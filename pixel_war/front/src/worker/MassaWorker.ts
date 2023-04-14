/* eslint-disable no-restricted-globals */

export enum WORKER_OPERATION {
    RUN = 'run',
}

self.onmessage = async (event: MessageEvent<WORKER_OPERATION>) => {
    if (process.env.REACT_APP_BASE_URL && event.origin !== process.env.REACT_APP_BASE_URL) {
        throw new Error(`Base origin ${event.origin} is different from event message origin`);
    }
    switch (event.data) {
        case WORKER_OPERATION.RUN: {
            console.log('Welcome from Massa Worker!');
            break;
        }
        default: {
            break;
        }
    }
};

export {};
