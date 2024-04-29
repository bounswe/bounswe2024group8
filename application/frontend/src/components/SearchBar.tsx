import { useState, ChangeEvent } from "react";
import "./SearchBar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

        const searchResultLoc: SearchResultProps = {
          team: {
            teamName: response.data.team.name,
            description: response.data.team.description,
            logoUrl: response.data.team.logo,
            year: response.data.team.yearEstablished,
            coachName: response.data.team.coach,
          },
          feedProps: {
            posts: response.data.posts.map((post: any) => ({
              id: post.id,
              profilePic: "defaultProfilePic", // Assuming a default value; change if different logic is needed
              username: post.user.firstName, // Assuming 'user' is correctly populated
              community: "Global", // Static value; change if different logic is needed
              communityLink: "", // Empty string as placeholder
              text: post.text,
              imageUrl: "", // Provide default or conditional value
              likes: post.likes,
              dislikes: post.dislikes,
              commentsCount: post.comments,
            })),
          },
        };
        searchResult.team = searchResultLoc.team;
        searchResult.feedProps = searchResultLoc.feedProps;
        navigate("/searchResult");
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
      <button onClick={handleOnSearch}>a</button>
    </div>
  );
};

export default SearchBar;
