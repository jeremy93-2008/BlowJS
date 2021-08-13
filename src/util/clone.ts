export function clone(obj: any): any {
    if(typeof obj !== "object") throw new TypeError("The function can only clone object")
    let newObject: any = Array.isArray(obj) ? [] : {}
    Object.keys(obj).map(key => {
        if(obj[key] instanceof Element)
            newObject[key] = obj[key]
        else if(typeof obj[key] == "object")
            newObject[key] = clone(obj[key])
        else
            newObject[key] = obj[key]
    })
    if(obj instanceof Set)
        newObject = new Set(obj)
    else if(obj instanceof Map)
        newObject = new Map(obj)
    return newObject
}