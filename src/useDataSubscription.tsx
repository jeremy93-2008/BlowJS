import {ICreateSubscriberReturn, ISubscriptionCompare} from "./typing/blow.typing";
import {useMemo, useState} from "react";

export function useDataSubscription<T, K>(subscribers: ICreateSubscriberReturn<T, K>, action?: K, compare?: ISubscriptionCompare<T>) {
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