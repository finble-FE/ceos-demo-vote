import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from '../assets/ceos.png'


const Header = () => {
  const teamList = [
    { id: 0, name: "null" },
    { id: 1, name: "teample" },
    { id: 2, name: "finble" },
    { id: 3, name: "prefolio" },
    { id: 4, name: "diametes" },
    { id: 5, name: "recipeasy" },
  ];

  const teamId = Number(localStorage.getItem("team"));
  let state =
    localStorage.getItem("name") +
    " ( " +
    teamList[teamId].name +
    " , " +
    localStorage.getItem("part") +
    " ) ";

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="Logo" />
      </Link>

      <ButtonContainer>
        {localStorage.getItem("name") ? (
          <>
            <Text>{state}</Text>
            <Button onClick={logout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button>로그인</Button>
            </Link>
            <Link
              to={"/signUp"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button>회원가입</Button>
            </Link>
          </>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Header;

const Logo = styled.img`
  width: 130px;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10vh;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #384084;
  border-radius: 2rem;
  font-size: 0.8rem;

  &:hover {
    background-color: #384084;
    color: white;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  font-size: 1rem;
  margin-top: 0rem;
`;
