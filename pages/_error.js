import React, { Component } from 'react';
import { Link } from 'app/routes';
import { Container, Row, Col } from 'react-bootstrap';

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

    render() {
        return (
            <Main title='Error Page'>
                <article className={ styles.error }>
                    <Container>
                        <Row>
                            <Col xs={12}>

                                <p>{
                                    this.props.statusCode
                                    ? `${ this.props.statusCode }: ${ this.props.statusText }`
                                    : 'An error occurred on client'
                                }</p>

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
