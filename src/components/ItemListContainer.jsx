import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getFirestore, getDocs, where, query, collection } from 'firebase/firestore';
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
       const db = getFirestore();

       const ref = !id
        ? collection (db, "productos")
        : query (collection (db, "productos"), where ("categoryId", "==", id));

        getDocs (ref)
            .then((Snapshot) => {
                setItems (
                    Snapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data()};
                    })
                );
            })

            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingGif />; 

    return (
        <section className={getClassName() + ' grid'}>
            {items.map((i) => (
                <article key={i.id} className={`box b${i.classId}`}>
                    <div><h5><Link to={`/item/${i.id}`}>{i.title}</Link></h5></div>
                    <img src={i.imageId} alt={i.title} />
                </article>
            ))}
        </section>
    );
};





    