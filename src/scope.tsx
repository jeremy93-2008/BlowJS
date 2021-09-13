import {ICreateSubscriberStore, IScopedCreateSubscriberReturn, IScopedSubscribersReturn} from "./typing/blow.typing";
import React, {createContext} from "react";
import {createSubscriber} from "./subscriber";

export function createScopeSubscriber<T, K, C>(store: ICreateSubscriberStore<T, K, C>) {
    const Context = createContext({} as IScopedCreateSubscriberReturn<T, K, C>)
    return {
        Scope: {
            Provider: (props: any) => {
                const newScopedSubscribers: IScopedCreateSubscriberReturn<T, K, C> = {
                    __BLOW__: {
                        type: "scope",
                        initial: true
                    },
                    subscribers: createSubscriber(store)
                }
                newScopedSubscribers.subscribers.contextId = Math.random().toString(16).slice(2)
                return <Context.Provider value={newScopedSubscribers}>{props.children}</Context.Provider>
            },
            subscribers: Context
        }
    } as IScopedSubscribersReturn<T, K, C>
}
