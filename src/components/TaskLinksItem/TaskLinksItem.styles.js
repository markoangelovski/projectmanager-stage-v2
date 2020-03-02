import styled from "styled-components";

import { primary } from "../../constants/colors";

export const LinkBody = styled.div`
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

export const LinkPlaceholder = styled.span`
  font-size: 0.7rem;
  margin-left: 5px;

  && a {
    text-decoration: none;
    color: rgba(100, 130, 250, 0.8);
  }
`;

export const LinkDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
`;

export const LinkDetail = styled.div`
  color: rgba(104, 104, 104, 0.8);
  font-size: 0.7rem;
`;

export const LinkDescription = styled.div`
  // font-size: 0.7rem;
  margin: 5px 0;
  max-height: 70px;
  overflow: overlay;
`;

export const LinkIcon = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;
