import styled from "styled-components";
import { useState, useEffect } from "react";
import { USER_SERVER } from "../config";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const clickLogin = async () => {
    let request = {
      id: id,
      password: pw,
    };

    fetch(`${USER_SERVER}/vote/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "로그인에 성공했습니다") {
          const accessToken = data.token.access;
          axios.defaults.headers.common["Authorization"] = accessToken;

          localStorage.setItem("name", data.user.name);
          localStorage.setItem("part", data.user.part);
          localStorage.setItem("team", data.user.team);
          localStorage.setItem("access", data.token.access);
          localStorage.setItem("part_voted", data.user.part_voted);
          localStorage.setItem("token", accessToken);

          alert("로그인에 성공했습니다");
          window.location.replace("/");
        } else {
          alert("존재하지 않는 사용자입니다.");
        }
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Title> 로그인 </Title>

        <form onSubmit={onSubmit}>
          <ModalBox>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setId(e.target.value)
              }
              value={id}
              style={{ marginTop: "8rem" }}
              placeholder="아이디"
            />
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPw(e.target.value)
              }
              value={pw}
              placeholder="비밀번호"
              type="password"
            />
            <Button onClick={clickLogin}>로그인</Button>
          </ModalBox>
        </form>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #384084;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 40rem;
  margin-bottom: 1rem;
  color: white;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48rem;
  height: 28rem;
  border-radius: 1rem;
  background-color: white;
`;

const Input = styled.input`
  width: 35rem;
  height: 2.5rem;
  font-size: 0.8rem;
  border: 1px black solid;
  border-radius: 0.8rem;
  margin-top: 2rem;
  padding: 0.3rem 1rem;
  outline: none;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: #384084;
  border-radius: 0.8rem;
  color: #ffffff;
  margin-top: 5rem;
`;
