import {ICreateSubscriberReturn} from "./typing/blow.typing";
import {clone} from "./util/clone";

export function useEmitter<T,K,C>(subscribers: ICreateSubscriberReturn<T,K,C>) {
    return {
        emit: (action?: K, variables?: C) => {
            if(!action) return subscribers.broadcast(true, variables)

            const currentAction = subscribers.actions.find(act => act.actionId === action)
            if(!currentAction) return
            const returnData = currentAction.Fn(subscribers.data, variables)
            subscribers.prevData = clone(subscribers.data)
            subscribers.data = returnData ? clone(returnData) : subscribers.data
            subscribers.emit(action, variables)
        }
    }
}