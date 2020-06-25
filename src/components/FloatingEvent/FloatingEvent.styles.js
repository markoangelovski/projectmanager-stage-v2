import styled from "styled-components";
import { primary, dark, shadow } from "../../constants/colors";

export const FloatingEventStyle = styled.aside`
  z-index: 1;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 140px;
  right: 20px;

  div {
    background: ${primary};
    text-align: center;
    border-radius: 50px;
    box-shadow: ${shadow};
    color: ${dark};
    width: 40px;
    height: 40px;
  }
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
