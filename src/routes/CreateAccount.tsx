import { useState } from "react";
import "./CreateAccount.css";

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      // create an account
      // set the name of the user.
      // redirect to the home page
    } catch (e) {
      setError("일치하는 이메일 또는 패스워드가 없습니다. 다시 확인해주세요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">Log into 𝕏</h1>
      <form className="form" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
          className="input"
        />
        <input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
          className="input"
        />
        <input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
          className="input"
        />
        <input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
          className="input submit"
        />
      </form>
      {error !== "" && <span className="error">{error}</span>}
    </div>
  );
}
