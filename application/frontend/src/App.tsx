import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedOut from "./LoggedOut";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import CommunityBar from "./components/CommunityBar.tsx";
import Community from "./Community";
import SignUpPage from "./Signup";
import SearchResult from "./components/SearchResult.tsx";
import SearchResultIntermediate from "./components/SearchResultIntermediate.tsx";
import { PostData } from "./interfaces/postInterface";
import { ProfileProps } from "./interfaces/postInterface";
import image1 from "./assets/dummyimages/image1.png";
import image2 from "./assets/dummyimages/image2.png";
import image4 from "./assets/dummyimages/image4.png";
import image5 from "./assets/dummyimages/image5.png";
import pp1 from "./assets/dummyimages/pp1.png";
import pp2 from "./assets/dummyimages/pp2.png";
import pp3 from "./assets/dummyimages/pp3.png";
import pp4 from "./assets/dummyimages/pp4.png";
import pp5 from "./assets/dummyimages/pp5.png";
import { useState, useEffect } from "react";
import CreatePostOverlay from "./components/CreatePostOverlay.tsx";
import "./storage/storage.ts";
import { searchResult, loggedInProfileInfo } from "./storage/storage.ts";
import ProfileOuter from "./components/ProfileOuter.tsx";
import axios from "axios";

function App() {
  const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);
  const [postsData, setPostsData] = useState<PostData[]>([]);

  const convertBackendDataToPostData = (backendData: any[]): PostData[] => {
    return backendData.map((post) => ({
      id: post.postId,
      profilePic: post.user.profilePicture?`data:image/png;base64,${post.user.profilePicture}`:post.user.profilePicture,
      username: post.username,
      firstName: post.user.firstName,
      lastName: post.user.lastName,
      community: post.postedAt,
      communityLink: post.communityLink,
      title: post.title,
      text: post.text,
      imageUrl: post.image?`data:image/png;base64,${post.image}`:post.image,
      likes: post.likes,
      dislikes: post.dislikes,
      reactionType: post.reactionType,
      commentsCount: post.commentsCount
    }));
  };


  useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/posts/feed`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          const postDataArray = convertBackendDataToPostData(response.data);
          console.log(postDataArray);
          setPostsData(postDataArray);
        })
        .catch((error) => {
          console.log("No post yet", error);
        });
    }
  , []);


  const profileData: ProfileProps = {
    email: "ahmetali",
    firstName: "ahmet",
    lastName: "ali",
    community: {
      id: 1,
      name: "GALATASARAY",
      description: "Community of GALATASARAY",
      team: "GALATASARAY",
      fanaticCount: 2,
    },
    profilePicture: null,
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="homepage">
              <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
              <div className="dummydiv"></div>
              <Feed posts={postsData}></Feed>
              <div className="dummydiv"></div>
              <CommunityBar/>
              <CreatePostOverlay
                show={showCreatePostOverlay}
                onClose={() => setShowCreatePostOverlay(false)}
              />
            </div>
          }
        />
        <Route
          path="/searchResult"
          element={
            <div className="searchResultPage">
              <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
              <div className="dummydiv"></div>
              <SearchResult
                team={searchResult.team}
                feedProps={searchResult.feedProps}
              />
              <div className="dummydiv"></div>
              <CreatePostOverlay
                show={showCreatePostOverlay}
                onClose={() => setShowCreatePostOverlay(false)}
              />
            </div>
          }
        />
        <Route
          path="/searchResultIntermediate"
          element={
            <div className="searchResultPage">
              <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
              <div className="dummydiv"></div>
              <SearchResultIntermediate
                team={searchResult.team}
                feedProps={searchResult.feedProps}
              />
              <div className="dummydiv"></div>
              <CreatePostOverlay
                show={showCreatePostOverlay}
                onClose={() => setShowCreatePostOverlay(false)}
              />
            </div>
          }
        />
        <Route
          path="profile"
          element={
            <div className="homepage">
              <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
              <div className="dummydiv"></div>
              <ProfileOuter userId={localStorage.getItem("id")} />
              <div className="dummydiv"></div>
              <CreatePostOverlay
                show={showCreatePostOverlay}
                onClose={() => setShowCreatePostOverlay(false)}
              />
            </div>
          }
        />
        <Route path="/" element={<LoggedOut />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/community/:communityName" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
