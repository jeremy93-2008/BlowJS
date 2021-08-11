import {ICreateSubscriberReturn, IEmitVariable} from "./typing/blow.typing";

export function useEmitter<T,K>(subscribers: ICreateSubscriberReturn<T,K>) {
    return {
        emit: (action?: K, variables?: IEmitVariable) => {
            if(!action) return subscribers.broadcast(true, variables)

            const currentAction = subscribers.actions.find(act => act.actionId === action)
            if(!currentAction) return
            const returnData = currentAction.Fn(subscribers.data, variables)
            subscribers.prevData = JSON.parse(JSON.stringify(subscribers.data))
            subscribers.data = returnData ? {...returnData} : subscribers.data
            subscribers.emit(action, variables)
        }
    }
}