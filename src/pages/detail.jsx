import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { pokemonDetailService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const SpriteOuter = styled.div`
    width: 150px;
    img {
        max-width: 100%;
    }
`;

const Detail = (props) => {
    const { pokemon } = props;

    function getSprites() {
        return Object.keys(pokemon.sprites).map((key, index) => {
            return (
                <SpriteOuter key={index}>
                    <img src={pokemon.sprites[key]} />
                </SpriteOuter>
            );
        });
    }

    return (
        <Page initialProps={props} title={pokemon.name}>
            <Container>
                <Row>
                    <Col>
                        <h1>#{pokemon.id}: {pokemon.name}</h1>
                        {getSprites()}
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

Detail.getInitialProps = ({ query }) => {
    return getInitialPropsHelper(async () => {
        const response = await pokemonDetailService(query.pokemonName).fetch();

        return { pokemon: response };
    });
};

export default Detail;
