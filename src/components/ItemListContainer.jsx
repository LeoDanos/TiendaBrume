import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getFirestore, getDocs, where, query, collection } from 'firebase/firestore';
import { LoadingGif } from './LoadingGif';
import { ItemList } from './ItemList';

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

        const db = getFirestore();
        const ref = !id
            ? collection(db, "productos")
            : query(collection(db, "productos"), where("categoryId", "==", id));

        getDocs(ref)
            .then((snapshot) => {
                setItems(snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                }));
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingGif />;

    return (
        <section className={getClassName() + ' grid'}>
            <ItemList items={items} />
        </section>
    );
};