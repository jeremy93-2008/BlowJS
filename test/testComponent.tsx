import {ICreateSubscriberReturn} from "../src/typing/blow.typing";
import {ITestActions, ITestStore} from "./store";
import React, {useCallback, useState} from "react";
import {useDataSubscription} from "../src/useDataSubscription";
import {useSubscription} from "../src/useSubscription";
import {useEmitter} from "../src/useEmitter";

export const TestComponent = (props: { subscribers: ICreateSubscriberReturn<ITestStore, ITestActions, any> } ) => {
    const { subscribers } = props

    const [state, setState] = useState("")

    const { data } = useDataSubscription(subscribers)
    const { subscribe } = useSubscription(subscribers)
    const { emit } = useEmitter(subscribers)

    const onClick = useCallback(() => {
        emit("Hola")
    }, [subscribers, emit])

    const onClick2 = useCallback(() => {
        emit("Buenas")
    }, [subscribers, emit])

    const onClick3 = useCallback(() => {
        emit()
    }, [subscribers, emit])

    subscribe("Buenas", () => {
        setState("Buenas")
    })

    return (
        <div className="TestComponent">
            <span>{data.value}</span>
            <div className="subscribe">{state}</div>
            <div>
                <button className="subscribeBtn" onClick={onClick2}>Buenas</button>
                <button className="emitBtn" onClick={onClick}>Hola</button>
                <button className="broadcastBtn" onClick={onClick3}>Broadcast</button>
            </div>
        </div>
    )
}