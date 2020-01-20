import styled from "styled-components";

import { primary } from "../../constants/colors";

export const EventBody = styled.div`
  background: ${primary};
  padding: 5px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const EventTitle = styled.div`
  grid-column: span 3;

  span {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;

export const EventTask = styled.div`
  grid-column: span 3;

  svg,
  span {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;

export const EventDuration = styled.div`
  grid-column: span 1;
`;

export const EventBooking = styled.div`
  display: block;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
