import styled from "styled-components";
import { primary, dark, shadow } from "../../constants/colors";

export const Boxes = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 10px;

  > * > div {
    background: ${primary};
    text-align: center;
    padding: 1.5rem 2rem;
    box-shadow: ${shadow};
    color: ${dark};
  }
`;
// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
