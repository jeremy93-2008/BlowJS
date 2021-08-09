import {ICreateSubscriberReturn} from "./typing/blow.typing";

export function useEmitter(subscribers: ICreateSubscriberReturn) {
    return { emit: (action: string) => {
            subscribers.actions.filter(act => act.actionId === action).map(act => act.Fn())
            subscribers.emit(action)
    }}
}