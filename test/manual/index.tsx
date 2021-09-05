import React from "react"
import ReactDOM from "react-dom"
import {createSubscriber} from "../../src/subscriber";
import {useSubscription} from "../../src/useSubscription";
import {useEmitter} from "../../src/useEmitter";
import {useDataSubscription} from "../../src/useDataSubscription";
import {useBroadcast} from "../../src/useBroadcast";
import {createScopeSubscriber} from "../../src/scope";
import {ITestActions, ITestStore, testStore} from "../store";

const map = new Map()

map.set("hola", "miau")

const subscribers = createSubscriber<ITestStore, ITestActions, any>(testStore)

const { Scope } = createScopeSubscriber<ITestStore, ITestActions, any>(testStore)

ReactDOM.render(<Parent />, document.getElementById("app"))

export function Parent() {
    const { data } = useDataSubscription(subscribers, "Hola")
    const { subscribe } = useSubscription(subscribers)
    const { emit } = useEmitter(subscribers)
    const { broadcast } = useBroadcast(subscribers)

    subscribe("Hola", (data, variables) => {
        console.log("subscribed", data, variables)
    })

    const onClick = () => {
        emit("Hola", { trying: false })
        broadcast({ hey: "broadcast" })
    }

    return (<div>
        <p>Hola mundo</p>
        <button onClick={onClick}>{data.value}</button>
        <Scope.Provider>
            <Children />
        </Scope.Provider>
		<Scope.Provider>
            <Children />
        </Scope.Provider>
    </div>)
}

export function Children() {
    const { data } = useDataSubscription(Scope.subscribers, "Hola")
    const { emit } = useEmitter(Scope.subscribers)
    const onClick = () => {
        emit("Hola", { trying: "childScope" })
    }
    return <div style={{margin: "15px"}}>
        <p>Hola a todos</p>
        <p>{data.value}</p>
        <button onClick={onClick}>Hola</button>
    </div>
}