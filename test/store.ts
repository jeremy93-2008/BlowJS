export type ITestStore = {id: string, value: string, hola: any}
export type ITestActions = "Hola" | "Buenas"
export const testStore: any = {
    actions: [
        {
            actionId: "Hola",
            Fn: (data: any, variables: any) =>
                ({id:"hey", value: "Jeremy", hola: { buenas: "Hey" }})
        }
    ],
    data: {id: "identificador", value: "valor", hola: { buenas: "Hey"}}
}