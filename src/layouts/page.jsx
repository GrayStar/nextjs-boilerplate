import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import ErrorDisplay from 'app/components/error-display';
import Header from 'app/components/header';
import Footer from 'app/components/footer';
import Loader from 'app/components/loader';

export const STATES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export const getInitialPropsHelper = async (request) => {
    try {
        const response = await request();

        return {
            ...response,
            initialState: STATES.SUCCESS,
        };
    } catch (error) {
        return {
            error,
            initialState: STATES.ERROR,
        };
    }
};

export const lifeCycleHelper = (props, componentDidMount, componentWillUnmount) => {
    if (props.initialState !== STATES.SUCCESS) return;

    useEffect(() => {
        componentDidMount();

        return () => {
            componentWillUnmount();
        };
    }, []);
};

const FunctionalPage = ({ initialProps, children }) => {
    const [currentState, setCurrentState] = useState(initialProps.initialState);

    useEffect(() => {
        window.scrollTo(0, 0);

        Router.events.on('routeChangeStart', handleRouteChangeStart);
        Router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            Router.events.off('routeChangeStart', handleRouteChangeStart);
            Router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, []);

    function handleRouteChangeStart() {
        setCurrentState(STATES.LOADING);
    }

    function handleRouteChangeError() {
        setCurrentState(STATES.ERROR);
    }

    function getLoadingDisplay() {
        return <Loader />;
    }

    function getErrorDisplay() {
        return <ErrorDisplay error={initialProps.error} />;
    }

    function getSuccessDisplay() {
        return children;
    }

    function getDisplay() {
        switch (currentState) {
            case STATES.LOADING:
                return getLoadingDisplay();
            case STATES.ERROR:
                return getErrorDisplay();
            case STATES.SUCCESS:
            default:
                return getSuccessDisplay();
        }
    }

    return (
        <>
            <Header />
            {getDisplay()}
            <Footer />
        </>
    );
};

FunctionalPage.defaultProps = {
    initialProps: { initialState: STATES.SUCCESS },
    children: null,
    error: null,
};

export default FunctionalPage;
