export type successResponseOption = {
    statusCode: number,
    accessToken?:string,
    refreshToken?:string
}

export type paginationResponseMeta = {
    currentPage: number,
    totalPage: number,
    limit: number,
    nextPage: boolean,
    previousePage: boolean
}

export function successResponse<T extends object>( data:T|Array<T>, opt: successResponseOption ){
    return {
        message: "success",
        data: data,
        ...opt
    } 
}

export function paginationReponse(data:any[]|any, opt:successResponseOption ,meta:paginationResponseMeta){
    return {
        message: "success",
        data: data,
        ...opt,
        meta
    }
}