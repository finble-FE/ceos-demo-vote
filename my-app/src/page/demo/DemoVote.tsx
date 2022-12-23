import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../component/Header';
import NameBox from '../../component/NameBox';
import { USER_SERVER } from '../../network/config';
import { useEffect } from 'react';

const DemoVote = () => {
  const [currIndex, setCurrIndex] = useState(20);
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${USER_SERVER}/vote/demo-results/`)
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  //link="/demo/vote"
  const clickVote = () => {
    const request = {
      id: currIndex,
    };

    fetch(`${USER_SERVER}/vote/demo-results/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      } as any,
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          alert('투표가 반영되었습니다');
          window.location.replace('/demo/result');
          localStorage.setItem('demo_voted', 'true');
        } else {
          if (data.code === 'token_not_valid')
            alert('로그인 후 이용가능합니다');
          else alert(data);
        }
      });
  };

  return (
    <>
      <Header />
      <Container>
        <Title>데모데이 투표</Title>
        <BoxContainer>
          {team.map((i, key) => (
            <div key={key} onClick={() => setCurrIndex(i.id)}>
              <NameBox
                text="demo"
                teamName={i.name}
                teamDesc={i.description}
                color={i.id === currIndex ? '#fff' : 'black'}
                bgColor={i.id === currIndex ? '#384084' : '#fff'}
              />
            </div>
          ))}
        </BoxContainer>
        <SmallBoxContainer>
          {currIndex == 20 ? (
            <Box style={{ opacity: 0.5 }} onClick={clickVote}>
              <Text> 투표하기 </Text>
            </Box>
          ) : (
            <Box style={{ opacity: 1 }} onClick={clickVote}>
              <Text>투표하기</Text>
            </Box>
          )}
        </SmallBoxContainer>
      </Container>
    </>
  );
};

export default DemoVote;

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
  width: 1000px;
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
  cursor: pointer;
`;
const Text = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
`;
