import React from "react"
import ReactDOM from "react-dom"
import {createSubscriber} from "../src/subscriber";
import {useSubscription} from "../src/useSubscription";
import {useEmitter} from "../src/useEmitter";
import {useData} from "../src/useData";

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
    const { data } = useData(subscribers, "Hola")
    const { subscribe } = useSubscription(subscribers)
    const { emit } = useEmitter(subscribers)

    subscribe("Hola", (data) => {
        console.log("subscribed", data)
    })

    const onClick = () => {
        emit("Hola", {id: "hey"})
    }

    return (<div>
        <p>Hola mundo</p>
        <button onClick={onClick}>{JSON.stringify(data)}</button>
    </div>)
}