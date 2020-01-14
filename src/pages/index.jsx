import { Container, Row, Col } from 'react-bootstrap';

import { Link } from 'app/routes';
import { pokemonService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const Index = (props) => {
    function getCardList() {
        const cardListItems = props.pokemon.map(p => {
            return (
                <li key={p.name}>
                    <Link route={`/about/${p.name}`}>
                        <a>{p.name}</a>
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

Index.getInitialProps = () => {
    return getInitialPropsHelper(async () => {
        const pokemon = pokemonService();
        const { results } = await pokemon.fetch();

        return { pokemon: results };
    });
};

export default Index;
