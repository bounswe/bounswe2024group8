export interface PostData {
  id: number;
  profilePic: string;
  username: string;
  firstName: string;
  lastName: string;
  community: string;
  communityLink: string;
  title: string;
  text: string;
  imageUrl?: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
}

export interface FeedProps {
  posts: PostData[];
  style?: React.CSSProperties;
}

export interface PostProps extends PostData {
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
  onBookmark: () => void;
}

export interface SearchResultProps {
  team: TeamInfoProps;
  feedProps: FeedProps;
}

export interface TeamInfoProps {
  teamName: string;
  logoUrl: string;
  year: number;
  coachName: string;
}
