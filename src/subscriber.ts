import {
    IActionVariable,
    ICreateSubscriberAction,
    ICreateSubscriberReturn,
    ICreateSubscriberStore,
} from './typing/blow.typing'

export function createSubscriber<TData extends {}, TActions, TVariables>(store: ICreateSubscriberStore<TData, TActions, TVariables>): ICreateSubscriberReturn<TData, TActions, TVariables> {
    const listOfSubscribers = [] as ICreateSubscriberAction<TData, TActions, TVariables>[]
    const listOfDataSubscription = [] as ICreateSubscriberAction<TData, TActions, TVariables>[]

    const subscriberReturn: Partial<ICreateSubscriberReturn<TData, TActions, TVariables>> =
        {...store, subscribers: listOfSubscribers, dataSubscription: listOfDataSubscription, prevData: undefined}

    subscriberReturn.emit = (action: TActions, variables) =>
        emitSubscription<TData, TActions, TVariables>(subscriberReturn.data as TData, listOfSubscribers, listOfDataSubscription, action, variables)
    subscriberReturn.broadcast = (fromEmit, variables) =>
        broadcastSubscription<TData, TActions, TVariables>(subscriberReturn.data as TData, listOfSubscribers, listOfDataSubscription, variables, fromEmit)

    return subscriberReturn as ICreateSubscriberReturn<TData, TActions, TVariables>
}

function broadcastSubscription<T, K, C>(data: T,
                               subscribers: ICreateSubscriberAction<T, K, C>[],
                               dataSubscription: ICreateSubscriberAction<T, K, C>[],
                               variables: C | undefined,
                               fromEmit: boolean) {
    if(fromEmit)
        console.warn("Warning: Blow has detected a emit without specify an action. " +
            "This could lead to potential performance issues, " +
            "NO actions will be executed, but all subscribe function will. " +
            "If that what you wanted use useBroadcast hook instead")
    const defaultBlowVariable = {__BLOW__: {type: "broadcast"}}
    const broadcastVariable = variables ? {...variables, ...defaultBlowVariable} : defaultBlowVariable
    subscribers.map(sub => sub.Fn(data, broadcastVariable as IActionVariable<C>))
    dataSubscription.map(sub => sub.Fn(data, broadcastVariable as IActionVariable<C>))
}

function emitSubscription<T, K, C>(data: T,
                                subscribers: ICreateSubscriberAction<T, K, C>[],
                                dataSubscription: ICreateSubscriberAction<T, K, C>[],
                                action: K,
                                variables: C | undefined) {
    const defaultBlowVariables = {__BLOW__: {type: "emit", action: action}}
    const emitVariable = variables ? {...variables, ...defaultBlowVariables} : defaultBlowVariables
    subscribers.filter(sub => sub.actionId == action).map(sub => sub.Fn(data, emitVariable as unknown as IActionVariable<C>))
    dataSubscription.filter(sub =>
        (sub.actionId == action || sub.actionId == undefined)).map(sub => sub.Fn(data))
}
