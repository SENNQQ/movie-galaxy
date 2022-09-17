export interface ExternalLinksType {
    "facebook_id": string,
    "imdb_id": string,
    "instagram_id": string,
    "twitter_id": string,
}

export interface ExternalLinksPropsType {
    "links": ExternalLinksType,
    "media"?:string
}