import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../component/Header';
import NameBox from '../../component/NameBox';
import { USER_SERVER } from '../../config';

const PartVote = () => {
  const [member, setMember] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [currIndex, setCurrIndex] = useState(50);
  const location = useLocation();
  const part = location.state.data;

  let currPart: string;
  if (part === 'FRONT-END') {
    currPart = 'front';
  } else {
    currPart = 'back';
  }

  useEffect(() => {
    fetch(`${USER_SERVER}/vote/demo-results/`)
      .then((response) => response.json())
      .then((data) => {
        setTeam(data);
      });

    fetch(`${USER_SERVER}/vote/results/${currPart}/`)
      .then((response) => response.json())
      .then((data) => {
        setMember(data);
      });
  }, []);

  const onClick = () => {
    const request = {
      id: currIndex,
    };

    fetch(`${USER_SERVER}/vote/results/${currPart}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      } as any,
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {
          alert(data[0]);
        } else {
          alert('투표가 반영되었습니다');
          localStorage.setItem('part_voted', 'true');
          localStorage.setItem('result', 'front');
          window.location.replace('/part');
        }
      });
  };

  return (
    <>
      <Header />
      <Container>
        <Title>{part === 'FRONT-END' ? 'FE' : 'BE'} 파트장 투표</Title>
        <BoxContainer>
          {member.map((i, idx) => {
            const teamName: any = team.filter((t: any) => t.id === i.team);
            return (
              <div onClick={() => setCurrIndex(i.id)} key={idx}>
                <NameBox
                  text="person"
                  name={i.name}
                  teamName={teamName[0].name}
                  color={i.id === currIndex ? '#fff' : 'black'}
                  bgColor={i.id === currIndex ? '#384084' : '#fff'}
                />
              </div>
            );
          })}
        </BoxContainer>
        <SmallBoxContainer>
          {currIndex != 20 ? (
            <Box style={{ opacity: 1 }} onClick={onClick}>
              <Text> 투표하기 </Text>
            </Box>
          ) : (
            <Box style={{ opacity: 0.5 }}>
              <Text> 투표하기 </Text>
            </Box>
          )}
        </SmallBoxContainer>
      </Container>
    </>
  );
};

export default PartVote;

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
  flex-wrap: wrap;
  width: 800px;
  gap: 2rem;
  justify-content: center;
  padding: 0 0 6rem 0;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px #384084 solid;
  border-radius: 1rem;
  padding: 0.5rem 2.5rem;
  background-color: #384084;
  opacity: 0.5;
`;
const Text = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
`;
