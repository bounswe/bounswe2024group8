import "./SearchResult.css";
import Feed from "./Feed";
import { SearchResultProps } from "../interfaces/postInterface";

const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <div className="SearchResult">
      <div className="TeamInfo">
        <h1>TEAM INFO</h1>
      </div>
      <div className="Feed">
        <Feed posts={props.feedProps.posts}></Feed>
      </div>
    </div>
  );
};

export default SearchResult;
