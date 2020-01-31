import styled from "styled-components";
import { primary, shadow } from "../../constants/colors";

export const DayStatsContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 10px;

  > div {
    background: ${primary};
    box-shadow: ${shadow};
  }
`;
