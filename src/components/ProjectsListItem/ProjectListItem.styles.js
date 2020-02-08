import styled from "styled-components";

import { primary } from "../../constants/colors";

export const ProjectBody = styled.div`
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

export const ProjectDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProjectTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const ProjectDetail = styled.div`
  color: rgba(104, 104, 104, 0.8);
  font-size: 0.7rem;
`;

export const ProjectDescription = styled.div`
  margin: 5px 0;
  max-height: 70px;
  overflow: overlay;
`;

export const ProjectTaskCount = styled.div`
  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
    margin-right: 5px;
  }
`;
