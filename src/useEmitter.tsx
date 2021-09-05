import {IContextCreateSubscriberReturn, ICreateSubscriberReturn} from "./typing/blow.typing";
import { cloneDeep } from "lodash"
import {useSubscriberContext} from "./hook/useSubscriberContext";
import {useCallback} from "react";

export function useEmitter<T,K,C>(subscribersOrContext: ICreateSubscriberReturn<T, K, C> | IContextCreateSubscriberReturn<T, K, C>) {
    const { subscribers } = useSubscriberContext(subscribersOrContext)

    const emit = useCallback((action?: K, variables?: C) => {
        if(!action) return subscribers.broadcast(true, variables)

        const currentAction = subscribers.actions.find(act => act.actionId === action)
        if(!currentAction) {
            console.warn("Warning: Blow detect that no function are available for this action" +
                ". Subscription will be executed anyway, but no change will be done on the store.")
            subscribers.emit(action, variables)
            return
        }
        const returnData = currentAction.Fn(subscribers.data, variables)
        subscribers.prevData = cloneDeep(subscribers.data)
        subscribers.data = returnData ? cloneDeep(returnData) : subscribers.data
        subscribers.emit(action, variables)
    }, [subscribers])

    return { emit }
}
