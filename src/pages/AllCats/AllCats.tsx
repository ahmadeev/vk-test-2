import './AllCats.css';
import CatCard from '../../components/CatCard/CatCard.tsx';
import { useFavoriteCatsContext } from '../../contexts/FavoriteCats/hook.ts';
import { useCallback, useState } from 'react';

const CATS = [{ 'id': 'qn','url': 'https://cdn2.thecatapi.com/images/qn.jpg','width': 523,'height': 700 },{ 'id': '6dg','url': 'https://cdn2.thecatapi.com/images/6dg.jpg','width': 650,'height': 487 },{ 'id': 'abp','url': 'https://cdn2.thecatapi.com/images/abp.jpg','width': 4416,'height': 3312 },{ 'id': 'acm','url': 'https://cdn2.thecatapi.com/images/acm.jpg','width': 560,'height': 420 },{ 'id': 'c6m','url': 'https://cdn2.thecatapi.com/images/c6m.jpg','width': 500,'height': 375 },{ 'id': 'dpl','url': 'https://cdn2.thecatapi.com/images/dpl.jpg','width': 900,'height': 675 },{ 'id': 'dv9','url': 'https://cdn2.thecatapi.com/images/dv9.jpg','width': 600,'height': 738 },{ 'id': 'MjA1MDk2OA','url': 'https://cdn2.thecatapi.com/images/MjA1MDk2OA.jpg','width': 1024,'height': 702 },{ 'id': '8pCFG7gCV','url': 'https://cdn2.thecatapi.com/images/8pCFG7gCV.jpg','width': 750,'height': 937 },{ 'id': 'xPkUTg4-N','url': 'https://cdn2.thecatapi.com/images/xPkUTg4-N.jpg','width': 1277,'height': 850 }];

export default function AllCats() {
    const { isFavorite } = useFavoriteCatsContext();

    const [cats, setCats] = useState(CATS);

    function fetchNext() {
        setCats(prev => [...prev, ...CATS]);
    }

    const [, setObserver] = useState<IntersectionObserver>();

    const setEmptyDiv = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) fetchNext();
            });

            obs.observe(node);
            setObserver(obs);
        }
    }, []);

    return (
        <div className="all-cats__container">
            {
                cats.map(cat => {
                    return <CatCard
                        key={cat.id}
                        {...cat}
                        isLiked={isFavorite(cat.id)}
                    />;
                })
            }
            <div ref={setEmptyDiv}></div>
        </div>
    );
}
