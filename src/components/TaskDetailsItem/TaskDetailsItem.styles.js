import styled from "styled-components";

import { primary } from "../../constants/colors";

export const TaskBody = styled.div`
  background: ${primary};
  padding: 5px 10px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const TaskDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
    margin-left: 5px;
  }
`;

export const TaskTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const TaskDetail = styled.div`
  color: rgba(104, 104, 104, 0.8);
  font-size: 0.7rem;
`;

export const TaskDescription = styled.div`
  margin: 5px 0;
  max-height: 70px;
  overflow: overlay;
`;

export const TaskLink = styled.a`
  text-decoration: none;
  color: rgba(100, 130, 250, 0.8);
`;

export const TaskDetailCount = styled.div`
  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
    margin-right: 5px;
  }
`;
