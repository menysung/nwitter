import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import "./Tweet.css";

interface Tweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Tweet({ username, photo, tweet, userId, id }: Tweet) {
  const user = auth.currentUser;
  const [isDeleted, setIsDeleted] = useState(false);

  const onDelete = async () => {
    if (!user || user.uid !== userId) return;
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      // 트윗 삭제
      await deleteDoc(doc(db, "tweets", id));
      // 트윗 사진 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
      setIsDeleted(true);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  return (
    <>
      {!isDeleted && (
        <div className="tweet-wrapper">
          <div className="tweet-column">
            <span className="tweet-username">{username}</span>
            <p className="tweet-payload">{tweet}</p>
          </div>
          <div className="tweet-column">
            {photo && <img className="tweet-photo" src={photo} alt="Tweet" />}
          </div>
          {user?.uid === userId && (
            <button className="delete-button" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </>
  );
}
