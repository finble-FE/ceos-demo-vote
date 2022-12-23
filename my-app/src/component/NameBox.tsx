import styled from "styled-components";

interface text {
  fontsize?: number;
  width?: number;
  fontWeight?: number;
  padding?: number;
}

interface props {
  name?: string;
  teamName?: string;
  teamDesc?: string;
  text: string;
  color: string;
  bgColor: string;
}

const NameBox = ({ name, teamName, teamDesc, text, color, bgColor }: props) => {
  return (
    <Box style={{ color: color, background: bgColor }}>
      {text == "person" ? (
        <>
          <Text> {teamName} </Text>
          <Text fontsize={1.2} fontWeight={700}>
            {name}
          </Text>
        </>
      ) : (
        <>
          <Text fontsize={1.8} padding={0.7}>
            {teamName}
          </Text>
          <Text fontsize={0.8} width={15}>
            {teamDesc}
          </Text>
        </>
      )}
    </Box>
  );
};

export default NameBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  border: 3px #384084 solid;
  border-radius: 1rem;

  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;

  &:hover {
    background-color: #384084;
    color: #ffffff;
  }
`;

const Text = styled.div<text>`
  font-size: ${(props) => props.fontsize || 1}rem;
  width: ${(props) => props.width || 10}rem;
  font-weight: ${(props) => props.fontWeight || 500};
  padding: ${(props) => props.padding || 0}rem;
`;
