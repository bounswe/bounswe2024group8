export interface CustomProfile{
    username: string,
    profilePhoto: string,
    tournamentPoints : string
}

export interface Category{
    text: string,
    url: string
}

export interface DPost{
    id: number,
    title: string,
    body: string,
    memberId: number,
    tags: Tag[],
    category: string,
    visual: boolean,
    //reaction list, bookmark list, comment list
    challangeTo: number|null,
    fileUrl: string|null,
    likeCount: number,
    dislikeCount: number,
    liked: boolean,
    disliked: boolean,
    bookmark: boolean
}

export interface Tag{
    //id: number,
    value: string
}

