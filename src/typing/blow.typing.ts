export interface ICreateSubscriberAction {
    actionId: string
    Fn: Function
}

export interface ICreateSubscriberStore<T> {
    actions: ICreateSubscriberAction[]
    data: T
}

export interface ICreateSubscriberReturn extends ICreateSubscriberStore<any> {
    subscribers: ICreateSubscriberAction[]
    emit: (action: string) => void
}