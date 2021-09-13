import {
    IActionFn,
    IContextCreateSubscriberReturn,
    ICreateSubscriberReturn,
    ISubscriptionCompare
} from "./typing/blow.typing";
import {useCallback, useState} from "react";
import {useSubscriberContext} from "./hook/useSubscriberContext";
import {log} from "./logger/index";

export function useSubscription<T, K, C>(subscribersOrContext: ICreateSubscriberReturn<T, K, C> | IContextCreateSubscriberReturn<T, K, C>) {
    const { subscribers, isScoped, __BLOW__ } = useSubscriberContext(subscribersOrContext)
    const [initial, setInitial] = useState(true)

    const subscriptionFn = (data: T, variables: C | undefined,
                            fn: IActionFn<T,K,C>, compare?: ISubscriptionCompare<T>) => {
        if(compare && !compare(subscribers.prevData, data)) return
        fn(data, variables)
    }

    const subscribe = useCallback((action: K, fn: IActionFn<T, K, C>, compare?: ISubscriptionCompare<T>) => {
        if(!initial && (isScoped && !__BLOW__.initial)) return
        subscribers.subscribers.push({
            actionId: action,
            Fn: (data: T, variables) => {
                log("info", subscribers.contextId, "Subscription Callback - data:", data,
                    " - variables: ", variables , "SubscriptionFn: ", fn)
                subscriptionFn(data, variables, fn, compare)
            }
        })
        if(__BLOW__)
            __BLOW__.initial = false
        if(initial)
            setInitial(false)
    }, [initial, __BLOW__])

    return { subscribe }
}
