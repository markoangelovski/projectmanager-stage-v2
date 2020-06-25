import styled from "styled-components";

export const EventLogPlaceholder = styled.div`
  grid-column: span 2;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;

  svg:first-child {
    margin-right: 5px;
    color: rgba(255, 0, 0, 0.4);
  }
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

export const EventLogTitle = styled.span`
  font-size: 0.9rem;
  margin-left: 5px;
`;

export const EventLogInput = styled.input`
  border: none;
  background-color: inherit;
  width: ${props => (props.duration ? "25px" : "70%")};
`;

export const EventLogTitlePlaceholder = styled.p`
  display: inline-block;
  margin: 0;
  width: 70%;
  white-space: nowrap;
  overflow: overlay;
  font-size: 0.9rem;
  vertical-align: middle;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
