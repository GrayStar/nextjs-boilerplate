import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

import { cardService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const Index = (props) => {
    function getCardList() {
        const cardListItems = props.cards.map(card => {
            return (
                <li key={card.id}>
                    <Link href='/about/[cardId]' as={`/about/${card.id}`}>
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
                        <h1>Index Page</h1>
                        {getCardList()}
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

Index.getInitialProps = async () => {
    return getInitialPropsHelper(async () => {
        const indexCardService = cardService();
        const { cards } = await indexCardService.fetch();

        return { cards };
    });
};

export default Index;
