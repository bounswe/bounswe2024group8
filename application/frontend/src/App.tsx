import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedOut from "./LoggedOut";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import SearchBar from "./components/SearchBar";
import SignUpPage from "./Signup";
import { PostData } from "./interfaces/postInterface";
import image1 from "./assets/dummyimages/image1.png";
import image2 from "./assets/dummyimages/image2.png";
import pp1 from "./assets/dummyimages/pp1.png";
import pp2 from "./assets/dummyimages/pp2.png";

function App() {
  const postsData: PostData[] = [
    {
      id: 1,
      profilePic: pp1,
      username: "Can Öztemiz",
      community: "Fenerbahçe",
      communityLink: "fenerbahcelink",
      text: "Sizce Fenerbahçe'nin Trabzonspor karşısındaki hücum hattı nasıl olmalı?",
      imageUrl: image1,
      likes: 278,
      dislikes: 12,
      commentsCount: 124,
    },
    {
      id: 2,
      profilePic: pp2,
      username: "GalaGala123",
      community: "Galatasaray",
      communityLink: "galatasaraylink",
      text: "Icardi'nin bugünkü performansı çok iyi değil miydi?",
      imageUrl: image2,
      likes: 543,
      dislikes: 23,
      commentsCount: 87,
    },
    {
      id: 3,
      profilePic: "https://example.com/profilepic2.jpg",
      username: "jane_doe",
      community: "Fenerbahçe",
      communityLink: "fenerbahcelink",
      text: "This is the second sample post",
      imageUrl: "https://example.com/sampleimage2.jpg",
      likes: 15,
      dislikes: 3,
      commentsCount: 8,
    },
    {
      id: 4,
      profilePic: "https://example.com/profilepic2.jpg",
      username: "jane_doe",
      community: "Fenerbahçe",
      communityLink: "fenerbahcelink",
      text: "This is the second sample post",
      imageUrl: "https://example.com/sampleimage2.jpg",
      likes: 15,
      dislikes: 3,
      commentsCount: 8,
    },
    {
      id: 5,
      profilePic: "https://example.com/profilepic2.jpg",
      username: "jane_doe",
      community: "Fenerbahçe",
      communityLink: "fenerbahcelink",
      text: "This is the second sample post",
      imageUrl: "https://example.com/sampleimage2.jpg",
      likes: 15,
      dislikes: 3,
      commentsCount: 8,
    },
  ];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="homepage">
              <Navbar></Navbar>
              <div className="dummydiv">
                <SearchBar />
              </div>
              <Feed posts={postsData}></Feed>
              <div className="dummydiv"></div>
            </div>
          }
        />
        <Route path="/loggedout" element={<LoggedOut />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
