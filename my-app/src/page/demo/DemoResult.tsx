import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Header';
import VoteBox from '../../component/VoteBox';
import { USER_SERVER } from '../../config';

const grade = [1, 2, 3, 4, 5];

const DemoResult = () => {
  const [team, setTeam] = useState<any[]>([]);
  let myGrade;

  useEffect(() => {
    fetch(`${USER_SERVER}/vote/demo-results/`)
      .then((response) => response.json())
      .then((data) => setTeam(data));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Title>데모데이 투표 결과</Title>
        <BoxContainer>
          {team.map((i, index) => {
            myGrade = grade[index];

            if (
              index != 0 &&
              team[index].vote_num === team[index - 1].vote_num
            ) {
              grade[index] = grade[index - 1];
              myGrade = grade[index - 1];
            }

            return (
              <VoteBox
                key={index}
                grade={myGrade}
                name={i.name}
                team={i.description}
                vote={i.vote_num}
                type={false}
              />
            );
          })}
        </BoxContainer>
      </Container>
    </>
  );
};

export default DemoResult;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
`;

const Title = styled.div`
  color: #242957;
  height: 150px;
  font-size: 2.3rem;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 500px;
  gap: 2rem;
  margin: 0rem 0 6rem 0;
`;
