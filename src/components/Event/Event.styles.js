import styled from "styled-components";

import { primary, shadow } from "../../constants/colors";

export const EventBody = styled.div`
  background: ${primary};
  box-shadow: ${shadow};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const EventItem = styled.div`
  display: block;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
