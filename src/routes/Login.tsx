import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GithubButton from "../components/GithubButton";
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
    setError("");
    if (isLoading || email === "" || password === "") return;

    if (password.length < 6) {
      setError("비밀번호는 6글자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in: ", credentials.user);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Firebase Error: ", e);
        console.log("Error code: ", e.code.trim());
        switch (e.code) {
          case "auth/invalid-email":
            setError("잘못된 이메일 형식입니다.");
            break;
          case "auth/user-disabled":
            setError("사용 중지된 계정입니다.");
            break;
          case "auth/invalid-credential":
            setError("이메일 혹은 비밀번호가 일치하지 않습니다.");
            break;
          default:
            setError(`에러가 발생했습니다: ${e.code}`);
            break;
        }
      } else {
        console.error("Unknown error: ", e);
        setError("에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-title">Login 𝕏</h1>
      <form className="login-form" onSubmit={onSubmit}>
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

      <GithubButton />
    </div>
  );
}
