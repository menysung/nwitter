import React, { useState } from "react";
import "./PostTweetForm.css";

const PostTweetForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <form className="form">
      <textarea
        className="textarea"
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
};

export default PostTweetForm;
