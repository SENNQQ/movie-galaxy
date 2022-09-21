export interface PanelMoviePropsTypes {
    "item": PanelMovieTypes,
}

export interface PanelMovieTypes {
    "id":number,
    "backdrop_path": string,
    "title":string,
    "name":string,
    "vote_count":number,
    "vote_average":number,
    "runtime":number,
    "release_date":string,
    "first_air_date":string,
    "overview":string,
    "videos":{
        "results":[{
            id: string
            iso_639_1: string
            iso_3166_1: string
            key: string
            name: string
            official: boolean
            published_at:string
            site: string
            size: number
            type: string
        }]
    }
}
