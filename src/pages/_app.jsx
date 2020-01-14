import { ThemeProvider, createGlobalStyle } from 'styled-components';
import mainTheme from 'app/themes/main';

const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        font-size: 10px;
    }
    body {
        min-height: 100%;
        position: relative;
        ${({ theme }) => theme.fonts.xs};
        color: ${({ theme }) => theme.colors.black};
    }
    h1 {
        ${({ theme }) => theme.fonts.xxl};
    }
    h2 {
        ${({ theme }) => theme.fonts.xl};
    }
    h3, h4, h5, h6 {
        ${({ theme }) => theme.fonts.l};
    }
`;

function NextJsBoilerPlate({ Component, pageProps }) {
    return (
        <ThemeProvider theme={mainTheme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default NextJsBoilerPlate;