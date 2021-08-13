import {IActionFn, ICreateSubscriberReturn, ISubscriptionCompare} from "./typing/blow.typing";
import {useCallback, useState} from "react";

export function useSubscription<T, K, C>(subscribers: ICreateSubscriberReturn<T,K,C>) {
    const [initial, setInitial] = useState(true)

    const subscriptionFn = (data: T, variables: C | undefined,
                            fn: IActionFn<T,K,C>, compare?: ISubscriptionCompare<T>) => {
        if(compare && !compare(subscribers.prevData, data)) return
        fn(data, variables)
    }

    const subscribe = useCallback((action: K, fn: IActionFn<T, K, C>, compare?: ISubscriptionCompare<T>) => {
        if(!initial) return
        subscribers.subscribers.push({
            actionId: action,
            Fn: (data: T, variables) => subscriptionFn(data, variables, fn, compare)
        })
        setInitial(false)
    }, [initial])

    return { subscribe }
}
