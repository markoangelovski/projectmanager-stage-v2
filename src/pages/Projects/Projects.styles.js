import styled from "styled-components";

import { primary, dark, shadow } from "../../constants/colors";

export const ProjectsWrapper = styled.div`
  padding: 5px 0 0;
`;

export const ProjectMenu = styled.div`
  display: flex;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }
`;

export const ProjectMenuItem = styled.div`
  background: ${primary};
  margin: 5px 10px;
  text-align: center;
  border-radius: 50px;
  box-shadow: ${shadow};
  color: ${dark};
  width: 25px;
  height: 25px;
`;
