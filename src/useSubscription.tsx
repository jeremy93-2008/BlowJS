import {IActionFn, ICreateSubscriberReturn, IEmitVariable, ISubscriptionCompare} from "./typing/blow.typing";
import {useCallback, useState} from "react";

export function useSubscription<T, K>(subscribers: ICreateSubscriberReturn<T,K>) {
    const [initial, setInitial] = useState(true)

    const subscriptionFn = (data: T, variables: IEmitVariable| undefined,
                            fn: IActionFn<T>, compare?: ISubscriptionCompare<T>) => {
        if(compare && !compare(subscribers.prevData, data)) return
        fn(data, variables)
    }

    const subscribe = useCallback((action: K, fn: IActionFn<T>, compare?: ISubscriptionCompare<T>) => {
        if(!initial) return
        subscribers.subscribers.push({
            actionId: action,
            Fn: (data: T, variables) => subscriptionFn(data, variables, fn, compare)
        })
        setInitial(false)
    }, [initial])

    return { subscribe }
}