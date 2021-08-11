import {ICreateSubscriberAction, ICreateSubscriberReturn, ICreateSubscriberStore} from "./typing/blow.typing";

export function createSubscriber<T extends Object, K>(store: ICreateSubscriberStore<T, K>): ICreateSubscriberReturn<T, K> {
    const listOfSubscribers = [] as ICreateSubscriberAction<T, K>[]
    const listOfDataSubscription = [] as ICreateSubscriberAction<T, K>[]
    const subscriberReturn: Partial<ICreateSubscriberReturn<T, K>> =
        {...store, subscribers: listOfSubscribers, dataSubscription: listOfDataSubscription}
    subscriberReturn.emit = (action: K) =>
        emitSubscription<T, K>(subscriberReturn.data as T, listOfSubscribers, listOfDataSubscription, action)
    return subscriberReturn as ICreateSubscriberReturn<T, K>
}

function emitSubscription<T, K>(data: T,
                                subscribers: ICreateSubscriberAction<T, K>[],
                                dataSubscription: ICreateSubscriberAction<T, K>[],
                                action: K) {
    subscribers.filter(sub => sub.actionId == action).map(sub => sub.Fn(data))
    dataSubscription.filter(sub => sub.actionId == action).map(sub => sub.Fn(data))
    dataSubscription.filter(sub => sub.actionId == undefined).map(sub => sub.Fn(data))
}