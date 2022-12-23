import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Main from "./page/Main";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

import PartMain from "./page/part/PartMain";
import PartVote from "./page/part/PartVote";
import PartResult from "./page/part/PartResult";

import DemoMain from "./page/demo/DemoMain";
import DemoVote from "./page/demo/DemoVote";
import DemoResult from "./page/demo/DemoResult";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Main />} />

          <Route path="/part" element={<PartMain />} />
          <Route path="/part/vote" element={<PartVote />} />
          <Route path="/part/result" element={<PartResult />} />

          <Route path="/demo" element={<DemoMain />} />
          <Route path="/demo/vote" element={<DemoVote />} />
          <Route path="/demo/result" element={<DemoResult />} />
        </Routes>
      </Wrapper>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  html, body{
    height: 100vh;
    padding: 0;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-contents: center;
  width: 100%;
`;
