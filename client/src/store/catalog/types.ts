export type catalogType = {
    id: number
    clients_id: number
    mt_id: number
    score: number
    watchedep: number
    status: number
    last_update: string
    type_mt: string
    episodes: number
    img_string:string,
    name_mt_id:string
}


export type ErrorType = {
    code: number,
    message: string
}