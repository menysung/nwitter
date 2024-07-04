import { auth } from "../firebase";

export default function Header() {
  const user = auth.currentUser;

  return (
    <div>
      <style>
        {`
          .header {
            position: fixed;
            top: 10px;
            right: 20px;
            font-size: 18px;
            color: #fff;
           
          }
        `}
      </style>
      <div className="header">
        {user ? `${user.displayName}님 안녕하세요!` : "로그인 해주세요"}
      </div>
    </div>
  );
}
