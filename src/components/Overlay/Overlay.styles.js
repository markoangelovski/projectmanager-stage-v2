import styled from "styled-components";

import { primary, shadow } from "../../constants/colors";

export const OverlayPlaceholder = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const OverlayContainer = styled.div`
  top: 31vh;
  position: relative;
  padding: 10px 0;
  background-color: ${primary};
  box-shadow: ${shadow};
`;
