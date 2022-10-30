export interface CommentsPropsType {
    mt_id:number
    content_name:string
    type:string
}

export interface CommentsGetData {
    avatar: string
    clients_id: number
    comment: string
    comments_id: number
    content_id: number
    likes: number
    nickname: string
    verification: boolean
    comment_date:string
    content_name:string
    content_type:string
}