import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import data from '../data/tratamientos.json';
import { LoadingGif } from './LoadingGif';

export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const location = useLocation();

    const getClassName = () => {
        if (location.pathname.includes('/category/Cosmetologia')) {
            return 'cosmetologia-class';
        } else if (location.pathname.includes('/category/Manicuria')) {
            return 'manicuria-class';
        }
        return 'tienda-class';
    };

    useEffect(() => {
        setLoading(true);
        new Promise((resolve) => setTimeout(() => resolve(data), 2000))
            .then((response) => {
                if (!id) {
                    setItems(response);
                } else {
                    const filtered = response.filter(i => i.category === id);
                    setItems(filtered);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingGif />; 

    return (
        <section className={getClassName() + ' grid'}>
            {items.map((i) => (
                <article key={i.id} className={`box b${i.id}`}>
                    <div><h5><Link to={`/item/${i.id}`}>{i.title}</Link></h5></div>
                    <img src={i.pictureUrl} alt={i.title} />
                </article>
            ))}
        </section>
    );
};





    