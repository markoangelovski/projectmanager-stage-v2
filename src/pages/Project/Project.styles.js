import styled from "styled-components";

import { primary, dark, shadow } from "../../constants/colors";

export const ProjectWrapper = styled.div`
  padding: 5px 0 0;
`;

export const ProjectMenu = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }

  > div:first-child {
    display: flex;
  }

  div
    > div:nth-child(${props => {
        console.log("Project props", props);
        if (props.info) return 1;
        if (props.tasks) return 2;
        if (props.json) return 3;
      }})
    > svg {
    color: black;
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

export const ProjectSource = styled.pre`
  background: ${primary};
  margin-top: 0;
  overflow: overlay;
`;
