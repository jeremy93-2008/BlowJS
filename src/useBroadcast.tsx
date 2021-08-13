import {ICreateSubscriberReturn} from "./typing/blow.typing";

export function useBroadcast<T, K, C>(subscribers: ICreateSubscriberReturn<T, K, C>) {
    return {
        broadcast: (variables?: C) => {
            subscribers.broadcast(false, variables)
        }
    }
}
