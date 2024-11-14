import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 2rem;
      font-weight: 700;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 1.6rem;
      font-weight: 600;
    `} 

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.2rem;
      font-weight: 500;
    `} 

  line-height: 1.4;
`;

export default Heading;

// This is a template literal so we can have js expressions inside it
