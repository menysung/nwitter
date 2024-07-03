import React, { useState } from "react";
import { auth } from "../firebase";
import "./Profile.css"; //

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Handle file upload logic
    }
  };

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
        onChange={handleAvatarChange}
      />
      <span className="name">{user?.displayName ?? "Anonymous"}</span>
    </div>
  );
}
