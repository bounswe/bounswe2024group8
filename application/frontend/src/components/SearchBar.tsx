import { useState, ChangeEvent } from "react";
import "./SearchBar.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchResultProps } from "../interfaces/postInterface.ts";
import { searchResult } from "../storage/storage.ts";

interface InputProps {
  className: string;
  type: string;
  id: string;
  placeHolder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  className,
  type,
  id,
  placeHolder,
  onChange,
}) => (
  <input
    className={className}
    type={type}
    id={id}
    placeholder={placeHolder} // Fixed typo here: 'placeHolder' to 'placeholder'
    onChange={onChange}
    required
  />
);

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  function handleOnSearch() {
    axios
      .get("http://localhost:8080/api/v1/posts?param=" + keyword, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        let searchResultLoc: SearchResultProps;
        if (response.data.team) {
          searchResultLoc = {
            team: {
              teamName: response.data.team.teamName,
              logoUrl: response.data.team.logoUrl,
              year: response.data.team.year,
              coachName: response.data.team.coachName,
            },
            feedProps: {
              posts: response.data.posts.map((post: any) => ({
                id: post.id,
                profilePic: null, // Assuming a default value; change if different logic is needed
                username: post.user.firstName, // Assuming 'user' is correctly populated
                firstName: post.user.firstName,
                lastName: post.user.lastName,
                community: "Global", // Static value; change if different logic is needed
                communityLink: "", // Empty string as placeholder
                title: post.title,
                text: post.text,
                imageUrl: "", // Provide default or conditional value
                likes: post.likes,
                dislikes: post.dislikes,
                commentsCount: post.comments,
              })),
            },
          };
        } else {
          searchResultLoc = {
            team: {
              teamName: "",
              logoUrl: "",
              year: 0,
              coachName: "",
            },
            feedProps: {
              posts: response.data.posts.map((post: any) => ({
                id: post.id,
                profilePic: null,
                username: post.user.firstName,
                firstName: post.user.firstName,
                lastName: post.user.lastName,
                community: "Global",
                communityLink: "",
                title: post.title,
                text: post.text,
                imageUrl: "",
                likes: post.likes,
                dislikes: post.dislikes,
                commentsCount: post.comments,
              })),
            },
          };
        }
        searchResult.team = searchResultLoc.team;
        searchResult.feedProps = searchResultLoc.feedProps;
        if (location.pathname === `/searchResult`) {
          navigate(`/searchResultIntermediate`);
        } else {
          navigate(`/searchResult`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="search-bar">
      <Input
        className="SearchInput"
        type="text"
        id="keyword"
        placeHolder="Search..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
      />
      <button
        style={{
          fontSize: "small",
          backgroundColor: "#333",
          padding: "7px",
          borderRadius: "10%",
          marginLeft: "5px",
          cursor: "pointer",
          color: "#fff", // This sets the text color to white
        }}
        onClick={handleOnSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
