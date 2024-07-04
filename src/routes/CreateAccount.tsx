import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GithubButton from "../components/GithubButton";
import { auth } from "../firebase";
import "./CreateAccount.css";

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 버튼 한 번 더 클릭하면 에러메시지 초기화
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "auth/invalid-login-credentials":
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("이메일 혹은 비밀번호가 일치하지 않습니다.");
            break;
          case "auth/email-already-in-use":
            setError("이미 사용 중인 이메일입니다.");
            break;
          case "auth/weak-password":
            setError("비밀번호는 6글자 이상이어야 합니다.");
            break;
          case "auth/network-request-failed":
            setError("네트워크 연결에 실패 하였습니다.");
            break;
          case "auth/invalid-email":
            setError("잘못된 이메일 형식입니다.");
            break;
          case "auth/internal-error":
            setError("잘못된 요청입니다.");
            break;
          default:
            setError("에러가 발생했습니다.");
            break;
        }
      } else {
        setError("에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">Create Account 𝕏</h1>
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
      <div className="switcher">
        <span>이미 계정이 있습니까? </span>
        <Link to="/login">로그인 &rarr;</Link>
      </div>
      <GithubButton />
    </div>
  );
}
