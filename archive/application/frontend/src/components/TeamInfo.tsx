import React from "react";
import { TeamInfoProps } from "../interfaces/postInterface";
import "./TeamInfo.css";

interface TeamInfoContainerProps {
  team: TeamInfoProps;
}

const TeamInfo: React.FC<TeamInfoContainerProps> = ({ team }) => {
  console.log(team);
  return (
    <div className="TeamInfo">
      <div className="logoContainer">
        <img src={team.logoUrl} alt={`${team.teamName} Logo`} />
      </div>
      <div className="teamDetails">
        <h2>{team.teamName}</h2>
        <p>Founded: {team.year}</p>
        <p>Coach: {team.coachName}</p>
      </div>
    </div>
  );
};

export default TeamInfo;
