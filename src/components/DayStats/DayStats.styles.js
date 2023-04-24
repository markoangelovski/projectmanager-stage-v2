import styled from "styled-components";
import { primary, shadow } from "../../constants/colors";

export const DayStatsContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  z-index: -1;

  > div {
    background: ${primary};
    box-shadow: ${shadow};
  }

  > div > div {
    margin: auto;
  }

  > div > div > svg {
    transform: translate(0, 0);
  }
`;
