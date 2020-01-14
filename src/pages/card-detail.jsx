import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { cardDetailService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const CardImageOuter = styled.div`
    width: 150px;
    img {
        max-width: 100%;
    }
`;

const CardDetail = (props) => {
    const { card } = props;

    return (
        <Page initialProps={props} title={card.name}>
            <Container>
                <Row>
                    <Col>
                        <h1>Card Detail Page</h1>
                        <h2>Name: {card.name}</h2>
                        {card.nationalPokedexNumber ? <h2>Pokemon #: {card.nationalPokedexNumber}</h2> : null}
                        <CardImageOuter>
                            <img src={card.imageUrl} />
                        </CardImageOuter>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

CardDetail.getInitialProps = ({ query }) => {
    return getInitialPropsHelper(async () => {
        const aboutCardDetailService = cardDetailService(query.cardId);
        const { card } = await aboutCardDetailService.fetch();

        return { card };
    });
};

export default CardDetail;
