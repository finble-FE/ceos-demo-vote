import styled from 'styled-components';
import { useState } from 'react';
import { USER_SERVER } from '../config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [email, setEmail] = useState('');

  const [team, setTeam] = useState({ id: 2, name: 'finble' });
  const [part, setPart] = useState({ id: 'front', name: '프론트' });

  const teamList = [
    { id: 1, name: 'teample' },
    { id: 2, name: 'finble' },
    { id: 3, name: 'prefolio' },
    { id: 4, name: 'diametes' },
    { id: 5, name: 'recipeasy' },
  ];
  const partList = [
    { id: 'plan', name: '기획' },
    { id: 'design', name: '디자인' },
    { id: 'front', name: '프론트' },
    { id: 'back', name: '백' },
  ];

  const [isTeam, setIsTeam] = useState(false);
  const [isPart, setIsPart] = useState(false);

  const clickRegister = async () => {
    if (pw1 != pw2) {
      alert('비밀번호 필드와 비밀번호 확인 필드의 데이터가 다릅니다.');
    } else if (pw1.length < 8) {
      alert('8자 이상의 비밀번호를 입력해주세요');
    } else {
      let request = {
        id: id,
        password: pw1,
        email: email,
        part: part.id,
        name: name,
        team: team.id,
      };

      fetch(`${USER_SERVER}/vote/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data[0]) {
            alert(data[0]);
          } else if (data.message == '가입이 성공적으로 이루어졌습니다') {
            alert(data.message);
            window.location.replace('/');
          } else if (data.email) {
            alert(data.email);
          } else if (data.id) {
            alert(data.id);
          }
        });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Title> 회원가입 </Title>

        <form onSubmit={onSubmit}>
          <ModalBox>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
              placeholder="이름"
            />
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setId(e.target.value)
              }
              value={id}
              placeholder="아이디"
            />
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPw1(e.target.value)
              }
              value={pw1}
              placeholder="비밀번호"
              type="password"
            />
            {pw1.length != 0 && pw1.length < 8 ? (
              <ErrorText>8자 이상의 비밀번호를 입력해주세요</ErrorText>
            ) : (
              <></>
            )}
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPw2(e.target.value)
              }
              value={pw2}
              placeholder="비밀번호 확인"
              type="password"
            />
            {pw2 != '' && pw1 != pw2 ? (
              <ErrorText>비밀번호가 다릅니다</ErrorText>
            ) : (
              <></>
            )}
            <Row>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                value={email}
                placeholder="이메일 주소"
              />
            </Row>

            <SmallText> 팀 명 / 파트 </SmallText>

            <Row>
              <Button
                onClick={() => {
                  setIsPart(false);
                  setIsTeam(!isTeam);
                }}
              >
                {team.name}
              </Button>
              <Button
                onClick={() => {
                  setIsPart(!isPart);
                  setIsTeam(false);
                }}
              >
                {part.name}
              </Button>
            </Row>

            <Row>
              {isTeam ? (
                <ToggleBox style={{ marginRight: '18.5rem' }}>
                  {teamList.map((item, idx: number) => (
                    <ToggleItem
                      onClick={() => {
                        setTeam(item);
                        setIsTeam(!isTeam);
                      }}
                      key={idx}
                    >
                      {item.name}
                    </ToggleItem>
                  ))}
                </ToggleBox>
              ) : (
                <></>
              )}

              {isPart ? (
                <ToggleBox style={{ marginLeft: '19.5rem' }}>
                  {partList.map((item, idx) => (
                    <ToggleItem
                      key={idx}
                      onClick={() => {
                        setPart(item);
                        setIsPart(!isPart);
                      }}
                    >
                      {item.name}
                    </ToggleItem>
                  ))}
                </ToggleBox>
              ) : (
                <></>
              )}
            </Row>

            {isTeam || isPart ? (
              <></>
            ) : (
              <Button onClick={clickRegister} width={10}>
                가입하기
              </Button>
            )}
          </ModalBox>
        </form>
      </Container>
    </>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #384084;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-right: 40rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
`;

const SmallText = styled.div`
  color: #242957;
  margin-top: 2rem;
  margin-right: 35rem;
  font-size: 1rem;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50rem;
  height: 38rem;
  border-radius: 1rem;
  background-color: white;
`;

const Input = styled.input`
  width: 38rem;
  height: 1.6rem;
  font-size: 0.7rem;
  border: 0.5px black solid;
  border-radius: 0.8rem;
  outline: none;
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
`;

const Button = styled.div<{ width?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || 15}rem;
  height: 2.5rem;
  background-color: #384084;
  border-radius: 0.8rem;
  color: #ffffff;
  margin: 2rem 2rem 0 2rem;
  cursor: pointer;
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 1px black solid;
  width: 10rem;
  margin-top: 0.5rem;
`;

const ToggleItem = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: #384084;
`;
