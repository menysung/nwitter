import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import "./PostTweetForm.css";

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const changeImage = files[0];
      if (changeImage.size > 1000000) {
        alert("이미지 사이즈는 1MB 이하로 해주세요");
        setFile(null);
        return;
      }
      setFile(changeImage);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setLoading(true);
      //파이어 스토어에 tweet 저장하기
      const docRef = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${docRef.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(docRef, {
          photo: url,
        });
      }

      setTweet("");
      setFile(null);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <textarea
        className="tweet-textarea"
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?!"
      />
      <label className="attach-file-button" htmlFor="file">
        {file ? "Photo added ✅" : "Add photo"}
      </label>
      <input
        className="attach-file-input"
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <input
        className="submit-btn"
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </form>
  );
}
