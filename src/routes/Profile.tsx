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

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); //프로필 이름 수정
  const [name, setName] = useState("");

  const updateName = async () => {
    if (!name || name.trim().length < 2) return;
    if (!user) return;
    await updateProfile(user, {
      displayName: name,
    });
    setIsUpdate(false);
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const fetchTweets = async () => {
    const q = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(q);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, [user]);

  return (
    <div className="wrapper">
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
        onChange={onAvatarChange}
      />
      <span className="name">{user?.displayName ?? "익명의 유저"}</span>

      {/* 이름 수정 및 변경 저장 */}
      {isUpdate ? (
        <>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="새이름..."
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
