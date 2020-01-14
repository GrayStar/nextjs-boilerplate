import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { Link } from 'app/routes';
import { cardService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const Title = styled.h1`
  font-size: 50px;
  color: #00FF00;
`;

const Index = (props) => {
    function getCardList() {
        const cardListItems = props.cards.map(card => {
            return (
                <li key={card.id}>
                    <Link route={`/about/${card.id}`}>
                        <a>{card.name}</a>
                    </Link>
                </li>
            );
        });

        return <ul>{cardListItems}</ul>;
    }

    return (
        <Page initialProps={props} title='Index Page'>
            <Container>
                <Row>
                    <Col>
                        <Title>Index Page</Title>
                        {getCardList()}
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

Index.getInitialProps = () => {
    return getInitialPropsHelper(async () => {
        const indexCardService = cardService();
        const { cards } = await indexCardService.fetch();

        return { cards };
    });
};

export default Index;
