import React, {useCallback, useState} from "react"
import ReactDOM from "react-dom"
import {createSubscriber} from "../src/subscriber";
import {useSubscription} from "../src/useSubscription";
import {useEmitter} from "../src/useEmitter";

const subscribers = createSubscriber<{id: string, value: string}, "Hola" | "Buenas">({
    actions: [
        {
            actionId: "Hola",
            Fn: (data, variables) =>
                console.log("Funciona", data, variables)
        }
    ],
    data: {id: "identificador", value: "valor"}
})

ReactDOM.render(<Parent />, document.getElementById("app"))

export function Parent() {
    const [valor, setValor] = useState("Se intenta")
    const { subscribe } = useSubscription(subscribers)
    const { emit } = useEmitter(subscribers)

    const cambiarValor = useCallback(() => {
        setValor("Nuevo Valor")
    }, [])

    subscribe("Hola", (data) => {
        console.log("subscribed", data)
        cambiarValor()
    })

    const onClick = () => {
        emit("Hola", {id: "hey"})
    }

    return (<div>
        <p>Hola mundo</p>
        <button onClick={onClick}>{valor}</button>
    </div>)
}