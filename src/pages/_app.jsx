import App from 'next/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        height: 100%
    }
    body {
        min-height: 100%;
        position: relative;
    }
`;

function NextJsBoilerPlate({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

export default NextJsBoilerPlate;