import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

// SVG 이미지 파일 import
import homeIcon from "../assets/home.svg";
import logoutIcon from "../assets/logout.svg";
import profileIcon from "../assets/profile.svg";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  img {
    width: 30px;
  }
  &.log-out {
    border-color: tomato;
    img {
      filter: invert(50%) sepia(100%) saturate(5000%) hue-rotate(-10deg);
    }
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <>
      <Wrapper>
        <Menu>
          <Link to="/">
            <MenuItem>
              <img src={homeIcon} alt="Home" />
            </MenuItem>
          </Link>
          <Link to="/profile">
            <MenuItem>
              <img src={profileIcon} alt="Profile" />
            </MenuItem>
          </Link>
          <MenuItem onClick={onLogOut} className="log-out">
            <img src={logoutIcon} alt="Logout" />
          </MenuItem>
        </Menu>
        <Outlet />
      </Wrapper>
    </>
  );
}
