import {ICreateSubscriberAction, ICreateSubscriberReturn, ICreateSubscriberStore} from "./typing/blow.typing";

export function createSubscriber<T extends Object, K>(store: ICreateSubscriberStore<T, K>): ICreateSubscriberReturn<T, K> {
    const listOfSubscribers = [] as ICreateSubscriberAction<T, K>[]
    const subscriberReturn: Partial<ICreateSubscriberReturn<T, K>> = {...store, subscribers: listOfSubscribers}
    subscriberReturn.emit = (action: K) =>
        emitSubscribers<T, K>(subscriberReturn.data as T, listOfSubscribers, action)
    return subscriberReturn as ICreateSubscriberReturn<T, K>
}

function emitSubscribers<T, K>(data: T, subscribers: ICreateSubscriberAction<T, K>[], action: K) {
    subscribers.filter(sub => sub.actionId == action).map(sub => sub.Fn(data))
}