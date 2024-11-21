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
    commentId: number,
    user:CustomUser,
    text: string,
    memberId: number,
    postId: number,
    likes: number,
    dislikes: number,
    liked: boolean,
    disliked: boolean
}

export interface DPost{
    postId: number,
    title: string,
    text: string,
    user: CustomUser,
    tags: Tag[],
    categoryId: number,
    isVisualPost: boolean,
    //reaction list, bookmark list, comment list
    challengedPostId: number|null,
    fileUrl: string|null,
    likes: number,
    dislikes: number,
    comments: number,
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

export interface CustomUser{
    id : number,
    profilePictureUrl: string | null,
    username: string
}