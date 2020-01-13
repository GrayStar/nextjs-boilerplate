import get from 'lodash/get';
import { ERRORS } from 'app/http-client';

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';

const ErrorDisplay = ({ error }) => {
    function getErrorMessage() {
        const errorMessage = get(error, 'message');
        return errorMessage || ERRORS.GENERIC().message;
    }

    function getDevError() {
        const originalError = get(error, 'originalError');

        if (!isDevelopmentEnvironment) return null;
        if (!originalError) return null;

        return <pre>{JSON.stringify(originalError, null, 4)}</pre>;
    }

    return (
        <div>
            <h1>An Error Occurred</h1>
            <p>{getErrorMessage()}</p>
            {getDevError()}
        </div>
    );
};

export default ErrorDisplay;
