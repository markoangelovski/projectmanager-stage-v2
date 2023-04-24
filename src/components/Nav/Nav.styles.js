import styled from "styled-components";
import { primary, dark, shadow } from "../../constants/colors";

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: ${shadow};
  z-index: 1;

  > * > a {
    background: ${primary};
    display: block;
    padding: 0.8rem;
    text-align: center;
    color: ${dark};
  }
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
