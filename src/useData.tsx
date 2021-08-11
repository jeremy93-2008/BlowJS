import {ICreateSubscriberReturn} from "./typing/blow.typing";
import {useMemo, useState} from "react";

export function useData<T, K>(subscribers: ICreateSubscriberReturn<T, K>, action?: K) {
    const [data, setData] = useState(subscribers.data)
    const [initial, setInitial] = useState(true)

    const onDataChange = (data: T) => {
        setData(data)
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