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
    postId : number, 
    userId : number, 
    startIndex: number | null, 
    endIndex: number | null, 
    content: string,
}



export interface CustomUser{
    id : number,
    profilePictureUrl: string | null,
    username: string
}


export interface DisplayedAnnotationData{
    userId: string,
    username: string,
    annotation: string,
    annotatedText : string
}

export interface RecievedAnnotationData{
    context: string,
    id : string,
    type: string,
    bodyValue: string,
    created: string,
    creator: RecievedAnnotationCreator,
    target: RecievedAnnotationTarget
}

interface RecievedAnnotationCreator{
    id: string,
    type: string,
    nickname: string
}

interface RecievedAnnotationTarget{
    selector: RecievedAnnotationTargetSelector,
    source: string
}
interface RecievedAnnotationTargetSelector{
    type: string,
    start: number,
    end: number
}