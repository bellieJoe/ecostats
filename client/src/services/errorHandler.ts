

interface Error {
    error : string
    msg : string
}

export const parseResError = (err) : Error => {
    console.log(err)
    try {
        if(err.response.data.msg && err.response.data.error){
            return {
                error : err.response.data.error,
                msg : err.response.data.msg
            }
        }
        return {
            error : "Unknown Error",
            msg : "An unexpected error occured while processing the request"
        }
    } catch (error) {
        return {
            error : "Unknown Error",
            msg : "An unexpected error occured while processing the request"
        }
    }
}