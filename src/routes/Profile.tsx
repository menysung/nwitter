import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { auth, db, storage } from "../firebase";
import "./Profile.css";

interface Tweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState<string | null>(user?.photoURL || null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchTweets();
  }, [user]);

  const fetchTweets = async () => {
    try {
      const q = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      const querySnapshot = await getDocs(q);
      const fetchedTweets: Tweet[] = [];
      querySnapshot.forEach((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        fetchedTweets.push({
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        });
      });
      setTweets(fetchedTweets);
    } catch (error) {
      console.error("Error fetching tweets: ", error);
    }
  };

  const updateName = async () => {
    try {
      if (!name || name.trim().length < 2) {
        console.log("이름은 최소 2자 이상이어야 합니다.");
        return;
      }
      if (!user) {
        console.log("사용자가 로그인하지 않았습니다.");
        return;
      }
      await updateProfile(user, { displayName: name });
      setIsUpdate(false);
    } catch (error) {
      console.error("Error updating name: ", error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file || !user) return;

      const storageRef = ref(storage, `avatars/${user.uid}`);
      const uploadTask = await uploadBytes(storageRef, file);
      const avatarUrl = await getDownloadURL(uploadTask.ref);

      setAvatar(avatarUrl);
      await updateProfile(user, { photoURL: avatarUrl });
    } catch (error) {
      console.error("Error updating avatar: ", error);
    }
  };

  return (
    <div className="profile-wrapper">
      <label htmlFor="avatar" className="avatar-upload">
        {avatar ? (
          <img src={avatar} className="avatar-img" alt="Avatar" />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </label>
      <input
        id="avatar"
        type="file"
        className="avatar-input"
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <span className="name">{user?.displayName || "익명의 유저"}</span>

      {isUpdate ? (
        <>
          <input
            type="text"
            placeholder="새이름..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={updateName}>저장</button>
        </>
      ) : (
        <button onClick={() => setIsUpdate(true)}>수정</button>
      )}

      <div className="tweets-container">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
}
