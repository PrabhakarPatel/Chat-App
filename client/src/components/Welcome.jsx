import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Message.</h3>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
export default Welcome;
