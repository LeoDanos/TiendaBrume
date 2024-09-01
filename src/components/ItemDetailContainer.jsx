import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import { ItemCount } from './ItemCount'
import { CartContext } from '../contexts/CartContext';

import { LoadingGif } from './LoadingGif'

export const ItemDetailContainer = () => {

    const [item, setItem] = useState ([]);
    const [loading, setLoading] = useState(true);

    const {addItem} = useContext(CartContext);

    const {id} = useParams();

    useEffect(() => {
       const db = getFirestore();
       const refDoc = doc (db, "productos", id);

        getDoc (refDoc)
        .then ((snapshot) => {
            setItem ({ ...snapshot.data(), id: snapshot.id});
        })

        .finally(() => setLoading(false));
    }, [id])

    const onAdd = (quantity) => {
        addItem ({ ...item, quantity });
    };

    if(loading) return (<LoadingGif />);

    return (
        <Container className="itemDetail mt-4">
            <div>
            <img src={item.imageId} alt={item.title} height={600} width={600} style={{ objectFit: 'cover' }}/>
            </div>
            <div>
            <h1>{item.title}</h1>
            <Link to={`/category/${item.categoryId}`}>{item.categoryId}</Link>
            <br /><br /><h5>{item.description}</h5><br />
            <h4><b>PRECIO: </b>${item.price}</h4>
            <b>Turnos Disponibles: </b>{item.stock}<br /><br />
            <ItemCount stock={item.stock} onAdd={onAdd} />
            </div>
        </Container>
        );
        
}