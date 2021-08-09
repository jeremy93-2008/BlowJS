import React from "react"
import ReactDOM from "react-dom"
import {createSubscriber} from "../src/subscriber";
import {useSubscription} from "../src/useSubscription";
import {useEmitter} from "../src/useEmitter";

const subscribers = createSubscriber({
    actions: [
        {actionId: "Hola", Fn: () => console.log("Funciona")}
    ],
    data: []
})

ReactDOM.render(<Parent />, document.getElementById("app"))

export function Parent() {
    const { subscribe } = useSubscription(subscribers)
    const { emit } = useEmitter(subscribers)

    subscribe("Hola", () => {
        console.log("subscribed")
    })

    const onClick = () => {
        emit("Hola")
    }

    return (<div>
        <p>Hola mundo</p>
        <button onClick={onClick}>Se intenta</button>
    </div>)
}