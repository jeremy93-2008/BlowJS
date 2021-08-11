import {
    ICreateSubscriberAction,
    ICreateSubscriberReturn,
    ICreateSubscriberStore,
    IEmitVariable
} from "./typing/blow.typing";

export function createSubscriber<T extends {}, K>(store: ICreateSubscriberStore<T, K>): ICreateSubscriberReturn<T, K> {
    const listOfSubscribers = [] as ICreateSubscriberAction<T, K>[]
    const listOfDataSubscription = [] as ICreateSubscriberAction<T, K>[]

    const subscriberReturn: Partial<ICreateSubscriberReturn<T, K>> =
        {...store, subscribers: listOfSubscribers, dataSubscription: listOfDataSubscription, prevData: undefined}

    subscriberReturn.emit = (action: K, variables) =>
        emitSubscription<T, K>(subscriberReturn.data as T, listOfSubscribers, listOfDataSubscription, action, variables)
    subscriberReturn.broadcast = (fromEmit, variables) =>
        broadcastSubscription<T, K>(subscriberReturn.data as T, listOfSubscribers, listOfDataSubscription, variables, fromEmit)

    return subscriberReturn as ICreateSubscriberReturn<T, K>
}

function broadcastSubscription<T, K>(data: T,
                               subscribers: ICreateSubscriberAction<T, K>[],
                               dataSubscription: ICreateSubscriberAction<T, K>[],
                               variables: IEmitVariable | undefined,
                               fromEmit: boolean) {
    if(fromEmit)
        console.warn("Warning: Blow has detected a emit without specify an action. " +
            "This could lead to potential performance issues, " +
            "NO actions will be executed, but all subscribe function will. " +
            "If that what you wanted use useBroadcast hook instead")
    const defaultBlowVariable = {__BLOW__: {type: "broadcast"}}
    const broadcastVariable = variables ? {...variables, ...defaultBlowVariable} : defaultBlowVariable
    subscribers.map(sub => sub.Fn(data, broadcastVariable))
    dataSubscription.map(sub => sub.Fn(data, broadcastVariable))
}

function emitSubscription<T, K>(data: T,
                                subscribers: ICreateSubscriberAction<T, K>[],
                                dataSubscription: ICreateSubscriberAction<T, K>[],
                                action: K,
                                variables: IEmitVariable | undefined) {
    const defaultBlowVariables = {__BLOW__: {type: "emit", action: action}}
    const emitVariable = variables ? {...variables, ...defaultBlowVariables} : defaultBlowVariables
    subscribers.filter(sub => sub.actionId == action).map(sub => sub.Fn(data, emitVariable))
    dataSubscription.filter(sub =>
        (sub.actionId == action || sub.actionId == undefined)).map(sub => sub.Fn(data))
}