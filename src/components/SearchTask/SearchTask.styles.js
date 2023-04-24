import styled from "styled-components";

import { primary } from "../../constants/colors";

export const SearchTaskForm = styled.form`
  margin: 1rem 0;
  display: grid;
  grid-gap: 10px;
  padding: 0 10px;
`;

export const SearchTaskTitle = styled.input`
  background-color: ${primary};
  height: 25px;
  border: none;
  margin-left: 5px;
  padding: 0 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const SearchTaskOption = styled.div`
  padding-left: 10px;
  margin: 1px 0;
`;

// @media (min-width: 768px) {
//   font-size: 2rem;
//   margin: 0;
// }
