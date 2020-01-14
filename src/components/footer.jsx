import { get } from 'lodash';
import { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
`;

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

    return (
        <StyledFooter ref={$footer}>
            <Container>
                <Row>
                    <Col>
                        Footer
                    </Col>
                </Row>
            </Container>
        </StyledFooter>
    );
};

export default Footer;