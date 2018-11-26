import React, { Component } from 'react';
import { Link, Router } from 'app/routes';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Main from 'app/layouts/main';
import styles from 'app/scss/pages/index.scss';

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps(context) {
        const response = await axios.get('https://api.pokemontcg.io/v1/cards');
        return { cards: response.data.cards };
    }

    _handleButtonClick() {
        Router.pushRoute('/card/ex8-98');
    }

    _handleBrokenButtonClick() {
        Router.pushRoute('/nothing');
    }

    get _list() {
        if (!this.props.cards) return null;

        return this.props.cards.map(currentCard => {
            return (
                <li key={currentCard.id}>
                    <p>
                        <Link route={`/card/${ currentCard.id }`}>
                            <a>{ currentCard.name }</a>
                        </Link>
                    </p>
                </li>
            );
        });
    }

    render() {
        return (
            <Main title='Index Page'>
                <article className={ styles.index }>
                    <Grid>
                        <Row>
                            <Col xs={12}>

                                <h2>Index Page</h2>

                                <button onClick={ this._handleButtonClick.bind(this) }>Imperative Link (Working)</button>
                                <button onClick={ this._handleBrokenButtonClick.bind(this) }>Imperative Link (Broken)</button>

                                <ul>
                                    { this._list }
                                </ul>

                            </Col>
                        </Row>
                    </Grid>
                </article>
            </Main>
        );
    }
}
