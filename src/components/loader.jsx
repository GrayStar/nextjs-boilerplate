import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const RotatingLoader = styled.div`
    width: 32px;
    height: 32px;
    margin: 64px 0;
    border-radius: 50%;
    display: inline-block;
    border: 4px solid ${({ theme }) => theme.colors.white};
    border-top-color: ${({ theme }) => theme.colors.black};
    animation: ${rotate} 1000ms linear 0ms infinite normal;
`;

const Loader = () => {
    return (
        <div className='text-center'>
            <RotatingLoader />
        </div>
    );
};

export default Loader;
