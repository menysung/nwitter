import { GithubAuthProvider, signInWithPopup } from "firebase/auth"; // GithubAuthProvider와 signInWithPopup를 firebase/auth에서 가져옴
import React from "react";
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

interface GithubButtonProps {
  onClick?: () => void;
}

const GithubButton: React.FC<GithubButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider(); // GithubAuthProvider 생성
      const result = await signInWithPopup(auth, provider); // signInWithPopup 함수로 GitHub 인증 수행
      console.log(result);
      navigate("/"); // 로그인 성공 후 리다이렉트할 경로
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleGithubSignIn}>
      <Logo src="/github-logo.svg" />
      Continue with Github
    </Button>
  );
};

export default GithubButton;
