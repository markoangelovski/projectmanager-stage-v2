import styled from "styled-components";

import { primary, shadow } from "../../constants/colors";

export const MainMenuStyle = styled.section`
  background: ${primary};
  box-shadow: ${shadow};
  text-align: center;

  img {
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
  }
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
