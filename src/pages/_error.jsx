import ErrorDisplay from 'app/components/error-display';
import Header from 'app/components/header';
import Footer from 'app/components/footer';

const ErrorPage = (props) => {
    return (
        <>
            <Header />
            <ErrorDisplay error={props.error} />
            <Footer />
        </>
    );
};

ErrorPage.getInitialProps = ({ res, xhr }) => {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null);
    return { statusCode };
};

export default ErrorPage;
