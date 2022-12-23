import styled from "styled-components";

interface props {
  grade: number;
  name: string;
  team: string;
  vote: number;
  type: boolean;
}

interface text {
  fontsize?: number;
  fontweight?: number;
  color?: string;
  currGrade: boolean;
}

const VoteBox = ({ grade, name, team, vote, type }: props) => {
  let currGrade = false,
    currType = type;

  if (grade === 1) {
    currGrade = true;
  } else {
    currGrade = false;
  }

  return (
    <Box currGrade={currGrade} currType={currType}>
      <div style={{ display: "flex" }}>
        <Grade currGrade={currGrade}>{grade}</Grade>
        <Text currGrade={currGrade}>{name}</Text>
        <Text fontsize={0.9} fontweight={500} currGrade={currGrade}>
          {team}
        </Text>
      </div>
      <Text
        color="#384084"
        fontweight={700}
        fontsize={1.5}
        currGrade={currGrade}
      >
        {vote}
      </Text>
    </Box>
  );
};

export default VoteBox;

const Box = styled.div<{ currGrade: boolean; currType: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: ${({ currType }) => (currType ? "300px" : "500px")};
  border: 3px #384084 solid;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ currGrade }) => (currGrade ? "#384084" : "#fff")};
  text-align: center;
`;

const Grade = styled.div<{ currGrade: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ currGrade }) => (currGrade ? "#384084" : "#fff")};
  background-color: ${({ currGrade }) => (currGrade ? "#fff" : "#384084")};
  border-radius: 1rem;
  font-weight: 700;
`;

const Text = styled.div<text>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: ${(props) => props.fontsize || 1.1}rem;
  font-weight: ${(props) => props.fontweight || 900};
  color: ${({ currGrade }) => (currGrade ? "#fff" : "black")};
`;
