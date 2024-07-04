import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import "./Tweet.css";

export default function Tweet({ username, photo, tweet, userId, id }) {
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;

    try {
      // 트윗 삭제
      await deleteDoc(doc(db, "tweets", id));

      // 트윗 사진 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tweet-wrapper">
      <div className="tweet-column">
        <span className="tweet-username">{username}</span>
        <p className="tweet-payload">{tweet}</p>
        {user?.uid === userId && (
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
      <div className="tweet-column">
        {photo && <img className="tweet-photo" src={photo} alt="Tweet" />}
      </div>
    </div>
  );
}
