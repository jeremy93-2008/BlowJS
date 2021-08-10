import {IActionFn, ICreateSubscriberReturn} from "./typing/blow.typing";
import {useCallback, useState} from "react";

export function useSubscription<T, K>(subscribers: ICreateSubscriberReturn<T,K>) {
    const [initial, setInitial] = useState(true)

    const subscribe = useCallback((action: K, fn: IActionFn<T>) => {
        if(!initial) return
        subscribers.subscribers.push({
            actionId: action,
            Fn: fn
        })
        setInitial(false)
    }, [initial])

    return { subscribe }
}