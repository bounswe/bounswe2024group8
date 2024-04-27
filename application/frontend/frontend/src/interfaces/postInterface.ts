export interface PostData {
  id: number;
  profilePic: string;
  username: string;
  text: string;
  imageUrl?: string; // Optional field for image URL
  likes: number;
  dislikes: number;
  commentsCount: number;
}

export interface FeedProps {
  posts: PostData[]; // This is an array of PostData objects
}

export interface PostProps extends PostData {
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
  onShare: () => void;
}
