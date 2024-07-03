import React from "react";
import { ITweet } from "./Timeline";
import "./Tweet.css"; // CSS 파일을 import 합니다

const Tweet: React.FC<ITweet> = ({ username, photo, tweet }) => {
  return (
    <div className="tweet-wrapper">
      <div className="tweet-column">
        <span className="tweet-username">{username}</span>
        <p className="tweet-payload">{tweet}</p>
      </div>
      <div className="tweet-column">
        {photo ? <img className="tweet-photo" src={photo} alt="tweet" /> : null}
      </div>
    </div>
  );
};

export default Tweet;
