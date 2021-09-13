import {
    IContextCreateSubscriberReturn,
    ICreateSubscriberReturn,
    IScopedCreateSubscriberReturn,
    ISubscriptionCompare
} from "./typing/blow.typing";
import React, {createContext, useContext, useMemo, useState} from "react";
import {useSubscriberContext} from "./hook/useSubscriberContext";
import {log} from "./logger/index";

export function useDataSubscription<T, K, C>(subscribersOrContext: ICreateSubscriberReturn<T, K, C> | IContextCreateSubscriberReturn<T, K, C>, action?: K, compare?: ISubscriptionCompare<T>) {
    const { subscribers, isScoped, __BLOW__ } = useSubscriberContext(subscribersOrContext)
    const [data, setData] = useState(subscribers.data)
    const [initial, setInitial] = useState(true)

    const onDataChange = (d: T) => {
        log("info", subscribers.contextId, "DataSubscription Callback - data:", data,
            " - variables: ", null)
        if(compare && !compare(data, d)) return
        if(data === d) return
        setData(d)
    }

    useMemo(() => {
        if(!initial && (isScoped && !__BLOW__.initial)) return
        subscribers.dataSubscription.push({
            actionId: action,
            Fn: onDataChange
        })
        if(__BLOW__)
            __BLOW__.initial = false
        setInitial(false)
    }, [initial, __BLOW__])

    return { data }
}
