

interface Error {
    error : string
    msg : string
}

export const parseResError = (err) : Error => {
    console.log(err)
    if(err.response.data.msg && err.response.data.error){
        return {
            error : err.response.data.msg,
            msg : err.response.data.error
        }
    }
    return {
        error : "Unknown Error",
        msg : "An unexpected error occured while processing the request"
    }
}