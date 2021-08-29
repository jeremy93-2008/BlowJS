import {IContextCreateSubscriberReturn, ICreateSubscriberReturn} from "./typing/blow.typing";
import {useSubscriberContext} from "./hook/useSubscriberContext";

export function useBroadcast<T, K, C>(subscribersOrContext: ICreateSubscriberReturn<T, K, C> | IContextCreateSubscriberReturn<T, K, C>) {
    const { subscribers } = useSubscriberContext(subscribersOrContext)
    return {
        broadcast: (variables?: C) => {
            subscribers.broadcast(false, variables)
        }
    }
}
