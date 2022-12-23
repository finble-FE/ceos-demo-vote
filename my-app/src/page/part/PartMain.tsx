import styled from "styled-components";
import LargeBox from "../../component/LargeBox";
import Header from "../../component/Header";
import SmallBox from "../../component/SmallBox";

const PartMain = () => {
  const devPart = localStorage.getItem("part");
  const voteTF = localStorage.getItem("part_voted");

  // let str = "\n 파트장투표";
  // str = str.replace(/\n/g, "<br />");

  return (
    <>
      <Header />
      <Container>
        <Title>파트장 투표</Title>
        <BoxContainer>
          <BoxItem>
            {devPart === "front" ? (
              <LargeBox
                text1="FRONT-END"
                text2="파트장 투표"
                link="/part/vote"
              />
            ) : (
              <Box>
                {devPart === null
                  ? `로그인 후 이용 가능합니다`
                  : "FRONT-END 파트장 투표"}
              </Box>
            )}

            {(devPart === "front" && voteTF === "false") || devPart === null ? (
              <div onClick={() => alert("투표를 먼저 완료해주세요")}>
                <SmallBox text={"결과보기"} link="/part" text1="front" />
              </div>
            ) : (
              <SmallBox
                text={"결과보기"}
                link="/part/result"
                text1="front"
                onClick={() => {
                  localStorage.setItem("result", "front");
                }}
              />
            )}
          </BoxItem>

          <BoxItem>
            {devPart === "back" ? (
              <LargeBox
                text1="BACK-END"
                text2="파트장 투표"
                link="/part/vote"
              />
            ) : (
              <Box>
                {devPart === null
                  ? "로그인 후 이용 가능합니다"
                  : `BACK-END 파트장 투표`}
              </Box>
            )}
            {(devPart === "back" && voteTF === "false") || devPart === null ? (
              <div onClick={() => alert("투표를 먼저 완료해주세요")}>
                <SmallBox text={"결과보기"} link="/part" text1="back" />
              </div>
            ) : (
              <SmallBox text={"결과보기"} link="/part/result" text1="back" />
            )}
          </BoxItem>
        </BoxContainer>
      </Container>
    </>
  );
};

export default PartMain;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Title = styled.div`
  color: #242957;
  font-size: 2.3rem;
  margin-bottom: 4rem;
`;

const BoxContainer = styled.div`
  display: flex;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18rem;
  width: 18rem;
  border: 3px rgb(222, 226, 230) solid;
  background: rgb(222, 226, 230);
  color: #7d7d7d;
  border-radius: 1rem;
  margin 0 5rem;

  font-size: 1.5rem;
  line-height: 3rem;
`;

const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
