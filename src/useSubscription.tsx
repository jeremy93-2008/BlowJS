import {ICreateSubscriberReturn} from "./typing/blow.typing";

export function useSubscription(subscribers: ICreateSubscriberReturn) {
    return { subscribe: (action: string, fn: Function) => {
            subscribers.subscribers.push({actionId: action, Fn: fn})
    }}
}