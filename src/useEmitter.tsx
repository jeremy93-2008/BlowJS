import {ICreateSubscriberReturn} from "./typing/blow.typing";
import { cloneDeep } from "lodash"

export function useEmitter<T,K,C>(subscribers: ICreateSubscriberReturn<T,K,C>) {
    return {
        emit: (action?: K, variables?: C) => {
            if(!action) return subscribers.broadcast(true, variables)

            const currentAction = subscribers.actions.find(act => act.actionId === action)
            if(!currentAction) return
            const returnData = currentAction.Fn(subscribers.data, variables)
            subscribers.prevData = cloneDeep(subscribers.data)
            subscribers.data = returnData ? cloneDeep(returnData) : subscribers.data
            subscribers.emit(action, variables)
        }
    }
}
