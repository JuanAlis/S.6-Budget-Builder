// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
  justify-content: center
    margin: 30px;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

    body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
}
`;
