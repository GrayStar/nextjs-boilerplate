import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledHeader = styled.header`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
`;

const Header = () => {
    return (
        <StyledHeader>
            <Container>
                <Row>
                    <Col>
                        Header
                    </Col>
                </Row>
            </Container>
        </StyledHeader>
    );
};

export default Header;