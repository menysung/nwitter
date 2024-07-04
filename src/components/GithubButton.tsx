import { GithubAuthProvider, signInWithPopup } from "firebase/auth"; // GithubAuthProvider와 signInWithPopup를 firebase/auth에서 가져옴
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase"; // auth만 가져옴

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      //깃허브인증 제공 객체
      const provider = new GithubAuthProvider();
      //팝업으로 깃허브인증받기
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Continue with Github
    </Button>
  );
}
