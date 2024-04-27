import "./App.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import { PostData } from "./interfaces/postInterface";

function App() {
  const postsData: PostData[] = [
    {
      id: 1,
      profilePic: "https://example.com/profilepic1.jpg",
      username: "john_doe",
      text: "This is the first sample post",
      imageUrl: "https://example.com/sampleimage1.jpg",
      likes: 10,
      dislikes: 2,
      commentsCount: 5,
    },
    {
      id: 2,
      profilePic: "https://example.com/profilepic2.jpg",
      username: "jane_doe",
      text: "This is the second sample post",
      imageUrl: "https://example.com/sampleimage2.jpg",
      likes: 15,
      dislikes: 3,
      commentsCount: 8,
    },
  ];

  return (
    <div className="App">
      <Navbar></Navbar>
      <Feed posts={postsData}></Feed>
    </div>
  );
}

export default App;
