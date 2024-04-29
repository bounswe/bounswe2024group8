import "./Feed.css";
import Post from "./Post";
import { FeedProps } from "../interfaces/postInterface";

const Feed: React.FC<FeedProps> = (props) => {
  return (
    <div className="feed">
      {props.posts.map((post) => (
        <Post
          id={post.id}
          profilePic={post.profilePic}
          username={post.username}
          community={post.community}
          communityLink={post.communityLink}
          text={post.text}
          imageUrl={post.imageUrl}
          likes={post.likes}
          dislikes={post.dislikes}
          commentsCount={post.commentsCount}
          onLike={() => console.log("Liked", post.id)}
          onDislike={() => console.log("Disliked", post.id)}
          onComment={() => console.log("Comments", post.id)}
          onShare={() => console.log("Share", post.id)}
        />
      ))}
    </div>
  );
};

export default Feed;
