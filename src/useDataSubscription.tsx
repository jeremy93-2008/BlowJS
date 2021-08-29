import {
    IContextCreateSubscriberReturn,
    ICreateSubscriberReturn,
    IScopedCreateSubscriberReturn,
    ISubscriptionCompare
} from "./typing/blow.typing";
import React, {createContext, useContext, useMemo, useState} from "react";
import {useSubscriberContext} from "./hook/useSubscriberContext";

export function useDataSubscription<T, K, C>(subscribersOrContext: ICreateSubscriberReturn<T, K, C> | IContextCreateSubscriberReturn<T, K, C>, action?: K, compare?: ISubscriptionCompare<T>) {
    const { subscribers } = useSubscriberContext(subscribersOrContext)
    const [data, setData] = useState(subscribers.data)
    const [initial, setInitial] = useState(true)

    const onDataChange = (d: T) => {
        if(compare && !compare(data, d)) return
        if(data === d) return
        setData(d)
    }

    useMemo(() => {
        if(!initial) return
        subscribers.dataSubscription.push({
            actionId: action,
            Fn: onDataChange
        })
        setInitial(false)
    }, [initial])

    return { data }
}