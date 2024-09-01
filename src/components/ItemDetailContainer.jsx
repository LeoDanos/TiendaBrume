import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import { CartContext } from '../contexts/CartContext';
import { LoadingGif } from './LoadingGif';
import { ItemDetail } from './ItemDetail';

export const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);
    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();
        const refDoc = doc(db, "productos", id);

        getDoc(refDoc)
            .then((snapshot) => {
                setItem({ ...snapshot.data(), id: snapshot.id });
            })
            .finally(() => setLoading(false));
    }, [id]);

    const onAdd = (quantity) => {
        addItem({ ...item, quantity });
    };

    if (loading) return (<LoadingGif />);

    return (
        <Container>
            <ItemDetail item={item} onAdd={onAdd} />
        </Container>
    );
};
