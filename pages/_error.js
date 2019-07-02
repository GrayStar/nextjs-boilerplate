import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Link } from 'app/routes';

import Main from 'app/layouts/main';

import styles from 'app/scss/pages/error.scss';

export default class Error extends Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps({ res, xhr }) {
        const statusCode = res ? res.statusCode : (xhr ? xhr.status : null);
        return { statusCode };
    }

    get _errorParagraph() {
        const statusText = this.props.statusText || 'An error occurred on client';

        if (this.props.statusCode) return `${ this.props.statusCode }: ${ statusText }`;
        return '';
    }

    render() {
        return (
            <Main title='Error Page'>
                <article className={ styles.error }>
                    <Container>
                        <Row>
                            <Col xs={12}>

                                <p>{ this._errorParagraph }</p>

                                <p>
                                    <Link to='/'>
                                        <a>Home</a>
                                    </Link>
                                </p>

                            </Col>
                        </Row>
                    </Container>
                </article>
            </Main>
        );
    }
}
