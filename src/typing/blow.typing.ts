import {Context} from "react";

export type IActionVariable<T, K> = T & IDefaultVariables<K>
export type IDefaultVariables<K> = { __BLOW__: {type: string, action?: K } }
export type IActionFn<T, K, C> = (data: T, variables?: IActionVariable<C, K> | C) => T | undefined | void
export type ISubscriptionCompare<T> = (oldData: T | undefined, data: T) => boolean

export interface ICreateSubscriberAction<T, K, C> {
    actionId: K
    Fn: IActionFn<T, K, C>
}

export interface ICreateSubscriberData<T, K, C> {
    actionId: K | undefined
    Fn: IActionFn<T, K, C>
}

export interface ICreateSubscriberStore<T, K, C> {
    actions: ICreateSubscriberAction<T, K, C>[]
    data: T
}

export interface ICreateSubscriberReturn<TData, TActions, TVariables> extends ICreateSubscriberStore<TData, TActions, TVariables> {
    dataSubscription: ICreateSubscriberData<TData, TActions, TVariables>[]
    subscribers: ICreateSubscriberAction<TData, TActions, TVariables>[]
    prevData: TData | undefined
    emit: (action: TActions, variables?: TVariables) => void
    broadcast: (fromEmit: boolean, variables?: TVariables) => void
}

export type IContextCreateSubscriberReturn<TData, TActions, TVariables> = Context<IScopedCreateSubscriberReturn<TData, TActions, TVariables>>

export interface IScopedCreateSubscriberReturn<TData, TActions, TVariables> {
    __BLOW__: {
        type: "scope",
        initial: boolean
    }
    subscribers: ICreateSubscriberReturn<TData, TActions, TVariables>
}
