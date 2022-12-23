import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../component/Header';
import VoteBox from '../../component/VoteBox';
import { USER_SERVER } from '../../config';

const grade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PartResult = () => {
  const location = useLocation();
  const part = location.state.data;
  const [team, setTeam] = useState<any[]>([]);
  const [member, setMember] = useState<any[]>([]);
  let myGrade: any;

  useEffect(() => {
    fetch(`${USER_SERVER}/vote/demo-results/`)
      .then((response) => response.json())
      .then((data) => {
        setTeam(data);
      });

    fetch(`${USER_SERVER}/vote/results/${part}/`)
      .then((response) => response.json())
      .then((data) => {
        setMember(data);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Title>{part === 'front' ? 'FE' : 'BE'} 파트장 결과</Title>
        <BoxContainer>
          {member.map((i: any, index: number) => {
            if (
              index != 0 &&
              member[index].vote_num === member[index - 1].vote_num
            ) {
              grade[index] = grade[index - 1];
            }
            myGrade = grade[index];

            const teamName: any = team.filter((t: any) => t.id === i.team);

            return (
              <VoteBox
                key={i.id}
                grade={myGrade}
                name={i.name}
                team={teamName[0].name}
                vote={i.vote_num}
                type={true}
              />
            );
          })}
        </BoxContainer>
      </Container>
    </>
  );
};

export default PartResult;

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
