import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
/*
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
*/
import data from '../data/tratamientos.json';
import { LoadingGif } from './LoadingGif'

export const ItemListContainer = () => {
    const [items, setItems] = useState ([]);
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

useEffect(() => {
    new Promise((resolve, reject) => setTimeout(() => resolve(data), 2000))
    .then((response) => {
        if (!id) {
            setItems(response);
        }else {
            const filtered = response.filter (i => i.category === id);
            setItems(filtered);
        }
        })
    .finally(() => setLoading(false));
}, [id]);

if(loading) return (<LoadingGif />);
    return <section className="grid">{items.map((i) => (

// className={`b{i.id}`}
/*
    <Card key={i.id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={i.pictureUrl} alt={i.title}/>
      <Card.Body>
        <Card.Title>{i.title}</Card.Title>
        <Card.Text>
        {i.description}
        </Card.Text>
        <Card.Text>
        {i.price}
        </Card.Text>
        <Link to={`/item/${i.id}`}><Button variant="primary">Ver</Button></Link>
      </Card.Body>
    </Card>

  */

        
    
    
  <article key={i.id} className={`box b${i.id}`}>
    <div><h5><a href={`/item/${i.id}`}>{i.title}</a></h5></div>
    <img src={i.pictureUrl} alt={i.title} />
    
  </article>


/* <p>{i.description}</p>
      <p>{i.price}</p>
      */
    
    ))}</section>
}





    