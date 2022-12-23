import styled from "styled-components";
import LargeBox from "../component/LargeBox";
import Header from "../component/Header";

const Main = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>파트장 / 데모데이 투표</Title>
        <BoxContainer>
          <LargeBox text1={"파트장 투표"} text2={"바로가기"} link="/part" />
          {localStorage.getItem("demo_voted") === "true" ? (
            <LargeBox
              text1={"데모데이 결과"}
              text2={"바로가기"}
              link="/demo/result"
            />
          ) : (
            <LargeBox
              text1={"데모데이 투표"}
              text2={"바로가기"}
              link="/demo/vote"
            />
          )}
        </BoxContainer>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Title = styled.div`
  color: #242957;
  height: 150px;
  font-size: 2.3rem;
  margin-top: -2rem;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
