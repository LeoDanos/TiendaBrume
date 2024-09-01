import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import { CartContext } from '../contexts/CartContext';
import { LoadingGif } from './LoadingGif';
import { ItemDetail } from './ItemDetail';
import { NotFound } from './NotFound';

export const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { addItem } = useContext(CartContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const db = getFirestore();
        const refDoc = doc(db, "productos", id);

        getDoc(refDoc)
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    setError(true);
                    navigate('/notfound');
                } else {
                    setItem({ ...snapshot.data(), id: snapshot.id });
                }
            })
            .finally(() => setLoading(false));
    }, [id, navigate]);

    const onAdd = (quantity) => {
        addItem({ ...item, quantity });
    };

    if (loading) return <LoadingGif />;
    if (error) return <NotFound />;

    return (
        <Container>
            <ItemDetail item={item} onAdd={onAdd} />
        </Container>
    );
};
