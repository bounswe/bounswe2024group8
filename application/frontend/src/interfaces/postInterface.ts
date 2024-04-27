export interface PostData {
  id: number;
  profilePic: string;
  username: string;
  community: string;
  communityLink: string;
  text: string;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
}

export interface FeedProps {
  posts: PostData[];
}

export interface PostProps extends PostData {
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
  onShare: () => void;
}
