import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./Timeline.css"; // CSS 파일을 import 합니다
import Tweet from "./Tweet";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));

    // onsnapshot 함수로 실시간으로 쿼리(q) 결과를 확인함. 데이터 변경 있으면 콜백함수 호출
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweetsData: ITweet[] = [];
      snapshot.forEach((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        tweetsData.push({
          id: doc.id,
          tweet,
          createdAt,
          userId,
          username,
          photo,
        });
      });
      setTweets(tweetsData);
    });

    // Clean up function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  return (
    <div className="wrapper">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}
