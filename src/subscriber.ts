import {ICreateSubscriberAction, ICreateSubscriberReturn, ICreateSubscriberStore} from "./typing/blow.typing";

export function createSubscriber<T>(store: ICreateSubscriberStore<T>): ICreateSubscriberReturn {
    const subscribers = [] as ICreateSubscriberAction[]
    return {...store, subscribers, emit: (action: string) => emitSubscribers(subscribers, action)}
}

function emitSubscribers(subscribers: ICreateSubscriberAction[], action: string) {
    subscribers.filter(sub => sub.actionId == action).map(sub => sub.Fn())
}