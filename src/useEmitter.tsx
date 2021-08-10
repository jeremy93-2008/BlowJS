import {ICreateSubscriberReturn, IEmitVariable} from "./typing/blow.typing";

export function useEmitter<T,K>(subscribers: ICreateSubscriberReturn<T,K>) {
    return {
        emit: (action: K, variables?: IEmitVariable) => {
            const currentAction = subscribers.actions.find(act => act.actionId === action)
            if(!currentAction) return
            const returnData = currentAction.Fn(subscribers.data, variables)
            subscribers.data = returnData ? {...returnData} : subscribers.data
            subscribers.emit(action)
        }
    }
}