import styled from 'styled-components';

export const ProfileContainerStyle = styled.div`
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
    img {
        border-radius: 100%;
        height: 250px;
        width: 250px;
        object-fit: cover;
        margin: 2rem 4rem;
        @media (max-width: 768px) {
            height: 150px;
            width: 150px;
            margin: 1rem;
        }
    }
`