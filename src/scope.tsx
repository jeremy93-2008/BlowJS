import {ICreateSubscriberStore, IScopedCreateSubscriberReturn} from "./typing/blow.typing";
import React, {createContext} from "react";
import {createSubscriber} from "./subscriber";

export function createScopeSubscriber<T, K, C>(store: ICreateSubscriberStore<T, K, C>) {
    const newScopedSubscribers: IScopedCreateSubscriberReturn<T, K, C> = {
        __BLOW__: {
            type: "scope"
        },
        subscribers: createSubscriber(store)
    }

    const Context = createContext(newScopedSubscribers)
    return {
        Scope: {
            Provider: (props: any) => <Context.Provider value={newScopedSubscribers}>{props.children}</Context.Provider>,
            subscribers: Context
        }
    }
}