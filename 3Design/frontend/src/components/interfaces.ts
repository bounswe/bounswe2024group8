export interface CustomProfile{
    username: string,
    profilePhoto: string,
    tournamentPoints : string
}

export interface Category{
    text: string,
    id: string
}


export interface DComment{
    id: number,
    user:CustomProfile,
    body: string,
    memberId: number,
    postId: number,
    likeCount: number,
    dislikeCount: number,
    liked: boolean,
    disliked: boolean
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

export interface SendAnnotationData{
    target: SendAnnotationTarget,
    body: string
}


export interface SendAnnotationTarget{
    selector: SendAnnotationTargetSelector,
    source: number
}

export interface SendAnnotationTargetSelector{
    start: number | null,
    end: number | null
}