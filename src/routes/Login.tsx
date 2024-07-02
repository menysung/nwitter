import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 버튼 한 번 더 클릭하면 에러메시지 초기화
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      // await updateProfile(credentials.user, {
      //   displayName: name,
      // });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        //console.log(e.code, e.message);
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">Login 𝕏</h1>
      <form className="form" onSubmit={onSubmit}>
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
          value={isLoading ? "Loading..." : "Log in"}
          className="input submit"
        />
      </form>
      {error !== "" && <span className="error">{error}</span>}
      <div className="switcher">
        <span>계정이 없으신가요? </span>
        <Link to="/createaccount">가입하기 &rarr;</Link>
      </div>
    </div>
  );
}
