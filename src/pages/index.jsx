import Link from 'next/link';
import { cardService } from 'app/api';
import Page, { getInitialPropsHelper } from 'app/layouts/page';

const Index = ({ cards }) => {
    function getCardList() {
        const cardListItems = cards.map(card => {
            return (
                <li key={card.id}>
                    <Link href='/about/[cardId]' as={`/about/${card.id}`}>
                        <a>{card.name}</a>
                    </Link>
                </li>
            );
        });

        return <ul>{cardListItems}</ul>;
    }

    return (
        <Page>
            <h1>Index Page</h1>
            {getCardList()}
        </Page>
    );
};

Index.getInitialProps = async () => {
    return getInitialPropsHelper(async () => {
        const indexCardService = cardService();
        const { cards } = await indexCardService.fetch();

        return { cards };
    });
}

export default Index;