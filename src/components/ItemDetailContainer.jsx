import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import data from '../data/tratamientos.json';
import { LoadingGif } from './LoadingGif'

export const ItemDetailContainer = () => {

    const [item, setItem] = useState ([]);
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        new Promise ((resolve) => setTimeout(() => resolve(data), 2000))
        .then((response) => {
            const finded = response.find ((i) => i.id === Number (id));
            setItem(finded);
        })
        .finally(() => setLoading(false));
    }, [id])

    if(loading) return (<LoadingGif />);

    return (
        <Container className="mt-4">
        <h1>{item.title}</h1>
        <Link to={`/category/${item.category}`}>{item.category}</Link>
        <h3>{item.description}</h3>
        <img src={item.pictureUrl} alt={item.title} /> <br />
        <b>${item.price}</b>
        </Container>
        );
}