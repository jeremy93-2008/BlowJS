export const IS_LOG_ENABLED = false

export function log(type: "info" | "warn" | "error", contextId?: string, ...message: any[]) {
    if(IS_LOG_ENABLED && 'production' !== process.env.NODE_ENV) {
        console[type](`%c BLOWJS LOGGER: ${contextId ? `contextId: ${contextId}` : ""}`, 'color: yellow' ,"\n\t", ...message)
    }
}