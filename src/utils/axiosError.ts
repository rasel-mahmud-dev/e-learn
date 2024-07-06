function axiosError(ex: any, defaultMessage?: string, errMap?: { [key: string]: string }) {
    let msg = ex?.response?.data?.error
    if (msg && typeof msg === "string") {
        if (errMap && Object.keys(errMap).length) {
            for (let errMapKey in errMap) {
                if (msg.includes(errMapKey)) {
                    msg = errMap[errMapKey]
                    break;
                }
            }
        } else if (msg.includes("violates unique constraint")) {
            msg = "Already done"

        }
    } else if (ex?.message && typeof ex.message === "string") {
        msg = ex.message
    } else if (defaultMessage) {
        msg = defaultMessage
    }
    return msg
}

export default axiosError