import { useState, ChangeEvent } from "react";
import "./SearchBar.css";
import axios from "axios";

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

  function handleOnSearch() {
    axios
      .get("http://localhost:8080/api/v1/posts?param=" + keyword)
      .then((response) => {
        console.log(response.data);
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
