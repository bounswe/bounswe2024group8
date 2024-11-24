import React, { useEffect } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import styles from "./TournamentInfo.module.css"
import { Button } from "antd";
import { Tournament } from "../interfaces";

interface Props{
    info: Tournament | null,
    showButton: number
}

const TournamentInfo = ({info, showButton}: Props) => {

  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed || info!.isFinished) {
      return <span style={{ color: "red" }}>Tournament Over</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };


  return (
    <div
      className={styles.mainContainer}
    >
      <div>
        <h4 style={{ margin: "0 0 5px", fontSize: "1.2em" }}>
          Weekly Tournament
        </h4>
        {
            !info  ?
            <p>Tournament has ended. Waiting for rewards.</p> :
            <p style={{ margin: "0", fontSize: "0.9em", color: "#555" }}>
                Time left:{" "}
                <Countdown date={new Date(info.endTime)} renderer={renderer} />
            </p>
        }
        
      </div>
      {!!info && showButton == 0 &&
      
      <Button onClick={() => window.location.href = `/tournament/${info.categoryId}`} type="primary">See Leaderboard</Button>}
    </div>
  );
};

export default TournamentInfo;
