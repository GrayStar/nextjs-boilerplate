import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { pokemonDetailService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const CardImageOuter = styled.div`
    width: 150px;
    img {
        max-width: 100%;
    }
`;

const CardDetail = (props) => {
    const { pokemon } = props;

    function getSprites() {
        return Object.keys(pokemon.sprites).map((key, index) => {
            return (
                <CardImageOuter key={index}>
                    <img src={pokemon.sprites[key]} />
                </CardImageOuter>
            );
        });
    }

    return (
        <Page initialProps={props} title={pokemon.name}>
            <Container>
                <Row>
                    <Col>
                        <h1>Card Detail Page</h1>
                        <h2>Name: {pokemon.name}</h2>
                        {pokemon.id ? <h2>Pokemon#: {pokemon.id}</h2> : null}
                        {getSprites()}
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

CardDetail.getInitialProps = ({ query }) => {
    return getInitialPropsHelper(async () => {
        const pokemonDetails = pokemonDetailService(query.pokemonName);
        const response = await pokemonDetails.fetch();

        return { pokemon: response };
    });
};

export default CardDetail;
