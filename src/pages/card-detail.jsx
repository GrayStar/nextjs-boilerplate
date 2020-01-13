import { Container, Row, Col } from 'react-bootstrap';

import { cardDetailService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const CardDetail = (props) => {
    const { card } = props;

    return (
        <Page initialProps={props} title={card.name}>
            <Container>
                <Row>
                    <Col>
                        <h1>Card Detail Page</h1>
                        <h2>Name: {card.name}</h2>
                        <h2>Pokemon #: {card.nationalPokedexNumber}</h2>
                        <img src={card.imageUrl} />
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
