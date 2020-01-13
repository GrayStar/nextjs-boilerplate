import { get } from 'lodash';
import React, { useEffect, useRef } from 'react';

const Footer = () => {
    const $footer = useRef(null);

    useEffect(() => {
        setBodyPadding();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function setBodyPadding() {
        const footerHeight = get($footer, 'current.clientHeight', 0);
        document.body.style.paddingBottom = `${footerHeight}px`;
    }

    function handleWindowResize() {
        setBodyPadding();
    }

    return <footer ref={$footer}>Footer</footer>
};

export default Footer;