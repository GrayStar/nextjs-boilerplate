import { Container, Row, Col } from 'react-bootstrap';

import { cardDetailService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const About = (props) => {
    const { card } = props;

    return (
        <Page initialProps={props} title={`About ${card.name}`}>
            <Container>
                <Row>
                    <Col>
                        <h1>About Page</h1>
                        <h2>Name: {card.name}</h2>
                        <h2>Pokemon #: {card.nationalPokedexNumber}</h2>
                        <img src={card.imageUrl} />
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

About.getInitialProps = async ({ query }) => {
    return getInitialPropsHelper(async () => {
        const aboutCardDetailService = cardDetailService(query.cardId);
        const { card } = await aboutCardDetailService.fetch();

        return { card };
    });
};

export default About;
