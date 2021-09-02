import {
    IContextCreateSubscriberReturn,
    ICreateSubscriberReturn,
    IScopedCreateSubscriberReturn
} from "../typing/blow.typing";
import {createContext, useContext, useMemo} from "react";

export function useSubscriberContext<T,K,C>(subscribersOrContext:
                                                ICreateSubscriberReturn<T, K, C> |
                                                IContextCreateSubscriberReturn<T, K, C>) {
    const newContext = subscribersOrContext as IContextCreateSubscriberReturn<T, K, C>

    const isScoped = useMemo(() => {
        return !!((subscribersOrContext as any).Provider)
    }, [subscribersOrContext])

    const { subscribers: subscriberContext, __BLOW__ } = useContext( isScoped ? newContext : createContext({} as IScopedCreateSubscriberReturn<T, K, C>))

    return { subscribers: isScoped ? subscriberContext : subscribersOrContext as ICreateSubscriberReturn<T, K, C>, isScoped, __BLOW__}
}
