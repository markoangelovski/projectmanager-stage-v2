import styled from "styled-components";

import { primary, dark, shadow } from "../../constants/colors";

export const TaskWrapper = styled.div`
  padding: 5px 0 0;
`;

export const TaskMenu = styled.div`
  display: flex;

  svg {
    color: rgba(104, 104, 104, 0.8);
    font-size: 0.7rem;
    vertical-align: middle;
  }

  &
    div:nth-child(${props => {
        if (props.info) return 1;
        if (props.notesMenu) return 2;
        if (props.eventsMenu) return 3;
        if (props.json) return 4;
      }})
    > svg {
    color: black;
  }
`;

export const TaskMenuItem = styled.div`
  background: ${primary};
  margin: 5px 10px;
  text-align: center;
  border-radius: 50px;
  box-shadow: ${shadow};
  color: ${dark};
  width: 25px;
  height: 25px;
`;

export const TaskSource = styled.pre`
  background: ${primary};
  margin-top: 0;
  overflow: overlay;
`;
