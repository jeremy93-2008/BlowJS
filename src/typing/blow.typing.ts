export type IEmitVariable = { [x: string]: any }
export type IActionFn<T> = (data: T, variables?: IEmitVariable) => T | undefined | void
export type ISubscriptionCompare<T> = (oldData: T | undefined, data: T) => boolean

export interface ICreateSubscriberAction<T, K> {
    actionId: K
    Fn: IActionFn<T>
}

export interface ICreateSubscriberData<T, K> {
    actionId: K | undefined
    Fn: IActionFn<T>
}

export interface ICreateSubscriberStore<T, K> {
    actions: ICreateSubscriberAction<T, K>[]
    data: T
}

export interface ICreateSubscriberReturn<T, K> extends ICreateSubscriberStore<T, K> {
    dataSubscription: ICreateSubscriberData<T, K>[]
    subscribers: ICreateSubscriberAction<T, K>[]
    prevData: T | undefined
    emit: (action: K, variables?: IEmitVariable) => void
    broadcast: (fromEmit: boolean,variables?: IEmitVariable) => void
}