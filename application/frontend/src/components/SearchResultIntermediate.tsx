import "./SearchResult.css";
import SearchResultFeed from "./SearchResultFeed";
import TeamInfo from "./TeamInfo";
import { SearchResultProps } from "../interfaces/postInterface";
import { searchResult } from "../storage/storage";

const SearchResult: React.FC<SearchResultProps> = (props) => {
  const hasTeamInfo = searchResult.team.teamName !== "";

  return (
    <div className="SearchResult">
      {hasTeamInfo && (
        <div className="teamInfo">
          <TeamInfo team={searchResult.team} />
        </div>
      )}
      <div className="feedInSearchOuter">
        <SearchResultFeed
          posts={searchResult.feedProps.posts}
        ></SearchResultFeed>
      </div>
    </div>
  );
};

export default SearchResult;
