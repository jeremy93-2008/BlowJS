import {ICreateSubscriberReturn, IEmitVariable} from "./typing/blow.typing";

export function useBroadcast<T, K>(subscribers: ICreateSubscriberReturn<T, K>) {
    return {
        broadcast: (variables?: IEmitVariable) => {
            subscribers.broadcast(false, variables)
        }
    }
}