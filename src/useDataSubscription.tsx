import {
    IContextCreateSubscriberReturn,
    ICreateSubscriberReturn,
    IScopedCreateSubscriberReturn,
    ISubscriptionCompare
} from "./typing/blow.typing";
import React, {createContext, useContext, useMemo, useState} from "react";

export function useDataSubscription<T, K, C>(subscribersOrContext: ICreateSubscriberReturn<T, K, C> | IContextCreateSubscriberReturn<T, K, C>, action?: K, compare?: ISubscriptionCompare<T>) {
    const newContext = subscribersOrContext as IContextCreateSubscriberReturn<T, K, C>

    const isScoped = useMemo(() => {
        return (subscribersOrContext as any).Provider
    }, [subscribersOrContext])

    const { subscribers } = useContext( isScoped ? newContext : createContext({} as IScopedCreateSubscriberReturn<T, K, C>))

    const [data, setData] = useState(isScoped ? subscribers.data : (subscribersOrContext as ICreateSubscriberReturn<T, K, C>).data)
    const [initial, setInitial] = useState(true)

    const onDataChange = (d: T) => {
        if(compare && !compare(data, d)) return
        if(data === d) return
        setData(d)
    }

    useMemo(() => {
        if(!initial) return
        (isScoped ? subscribers : subscribersOrContext as ICreateSubscriberReturn<T, K, C>).dataSubscription.push({
            actionId: action,
            Fn: onDataChange
        })
        setInitial(false)
    }, [initial])

    return { data }
}