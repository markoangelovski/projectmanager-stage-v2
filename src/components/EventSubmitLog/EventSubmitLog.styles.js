import styled from "styled-components";

import { primary } from "../../constants/colors";

export const EventSubmitLogBody = styled.div`
  background: ${primary};
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  width: 95%;
  display: flex;
  justify-content: space-between;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;

export const EventLogTitle = styled.span`
  font-size: 0.9rem;
  width: 70%;
`;

export const EventLogInput = styled.input`
  border: none;
  background-color: inherit;
  width: ${props => (props.duration ? "25px" : "100%")};
`;

export const EventLogDuration = styled.div`
  position: relative;
  font-size: 1rem;
  float: right;
  white-space: nowrap;

  span {
    font-size: 0.7rem;
  }

  svg {
    position: absolute;
    left: 45px;
    top: 5px;
  }
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
