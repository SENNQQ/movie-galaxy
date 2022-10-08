export interface ExternalLinksType {
    "facebook_id": string,
    "imdb_id": string,
    "instagram_id": string,
    "twitter_id": string,
    freebase_id?: number,
    freebase_mid?: number
    tvdb_id?: number
    tvrage_id?: number
}

export interface ExternalLinksPropsType {
    "links": ExternalLinksType,
    "media"?:string
}