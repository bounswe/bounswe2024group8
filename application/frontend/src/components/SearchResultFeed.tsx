import "./SearchResultFeed.css";
import Post from "./Post";
import { FeedProps } from "../interfaces/postInterface";

const Feed: React.FC<FeedProps> = (props) => {
  if (props.posts.length === 0) {
    return (
      <div className="feedInSearch" style={{ textAlign: "center" }}>
        <h4>No related posts found.</h4>
      </div>
    );
  }
  return (
    <div className="feedInSearch">
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
