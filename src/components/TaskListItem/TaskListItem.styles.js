import styled from "styled-components";

import { primary } from "../../constants/colors";

export const TaskBody = styled.div`
  background: ${primary};
  padding: 5px 10px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  a:-webkit-any-link {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const TaskDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TaskTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const TaskDetail = styled.div`
  color: rgba(104, 104, 104, 0.8);
  font-size: 0.7rem;
`;

export const TaskDescription = styled.div`
  font-size: 0.7rem;
  margin: 5px 0;
  max-height: 70px;
  overflow: overlay;
`;

export const TaskIcon = styled.div`
  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
    margin: 0 5px;
  }
`;
