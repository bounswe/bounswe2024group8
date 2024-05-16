import "./Feed.css";
import Post from "./Post";
import { FeedProps } from "../interfaces/postInterface";

const Feed: React.FC<FeedProps> = (allProps) => {
  const {style,...props} = allProps;
  return (
    <div className="feed" style={style}>
      {props.posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          profilePic={post.profilePic}
          username={post.username}
          firstName={post.firstName}
          lastName={post.lastName}
          community={post.community}
          communityLink={post.communityLink}
          title={post.title}
          text={post.text}
          imageUrl={post.imageUrl}
          likes={post.likes}
          dislikes={post.dislikes}
          commentsCount={post.commentsCount}
          onLike={() => console.log("Liked", post.id)}
          onDislike={() => console.log("Disliked", post.id)}
          onComment={() => console.log("Comments", post.id)}
          onBookmark={() => console.log("Share", post.id)}
        />
      ))}
    </div>
  );
};

export default Feed;
