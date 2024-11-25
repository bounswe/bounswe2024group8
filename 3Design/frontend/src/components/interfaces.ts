export interface Profile{
    id: number,
    username: string,
    avatarUrl: string,
    tournamentPoints: number
}

export interface Category{
    name: string,
    id: string,
    description: string,
    followerCount: number
}


export interface DComment{
        commentId: number;
        text: string;
        user:CustomUser;
        likes: number;
        dislikes: number;
        reactionType: string;
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
    bookmark: boolean,
    reactionType: string
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
    nickName: string,
    experience: number
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

export interface Tournament{
    id: number,
    startTime: string,
    endTime : string,
    categoryId: number,
    isFinished : boolean
}

export interface TournamentEntry{
    id: number,
    user: CustomUser,
    postId: number,
    tournament: Tournament,
    score : number,
    finishedPosition : number
}

export interface Achievement{
    id: number,
    name: string,
    description: string,
    point: number,
    earnedAt: string
}