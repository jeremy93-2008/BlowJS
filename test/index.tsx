import React from "react"
import ReactDOM from "react-dom"
import {createSubscriber} from "../src/subscriber";
import {useSubscription} from "../src/useSubscription";
import {useEmitter} from "../src/useEmitter";
import {useDataSubscription} from "../src/useDataSubscription";
import {useBroadcast} from "../src/useBroadcast";
import {createScopeSubscriber} from "../src/scope";

const map = new Map()

map.set("hola", "miau")

const subscribers = createSubscriber<{id: string, value: string, hola: any}, "Hola" | "Buenas", any>({
    actions: [
        {
            actionId: "Hola",
            Fn: (data, variables) =>
                ({id:"hey", value: "Jeremy", hola: { buenas: "Hey" }})
        }
    ],
    data: {id: "identificador", value: "valor", hola: { buenas: "Hey", element: document.createElement("div"), lol:  map, func: () => console.log("Hola")}}
})

const { Scope } = createScopeSubscriber<{id: string, value: string, hola: any}, "Hola" | "Buenas", any>({
    actions: [
        {
            actionId: "Hola",
            Fn: (data, variables) =>
                ({id:"hey", value: "Jeremy", hola: { buenas: "Hey" }})
        }
    ],
    data: {id: "identificador", value: "valor", hola: { buenas: "Hey", element: document.createElement("div"), lol:  map, func: () => console.log("Hola")}}
})

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