import React from "react"
import ReactDOM from "react-dom"
import {createSubscriber} from "../src/subscriber";
import {useSubscription} from "../src/useSubscription";
import {useEmitter} from "../src/useEmitter";
import {useDataSubscription} from "../src/useDataSubscription";
import {useBroadcast} from "../src/useBroadcast";

const subscribers = createSubscriber<{id: string, value: string}, "Hola" | "Buenas">({
    actions: [
        {
            actionId: "Hola",
            Fn: (data, variables) =>
                ({id:"hey", value: "Jeremy"})
        }
    ],
    data: {id: "identificador", value: "valor"}
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
    </div>)
}