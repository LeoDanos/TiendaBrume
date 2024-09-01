import { Link } from 'react-router-dom';
import { ItemCount } from './ItemCount';

export const ItemDetail = ({ item, onAdd }) => {
    return (
        <div className="itemDetail mt-4">
            <div>
                <img src={item.imageId} alt={item.title} height={600} width={600} style={{ objectFit: 'cover' }} />
            </div>
            <div>
                <h1>{item.title}</h1>
                <Link to={`/category/${item.categoryId}`}>{item.categoryId}</Link>
                <br /><br />
                <h5>{item.description}</h5>
                <br />
                <h4><b>PRECIO: </b>${item.price}</h4>
                <b>Turnos Disponibles: </b>{item.stock}<br /><br />
                <ItemCount stock={item.stock} onAdd={onAdd} />
            </div>
        </div>
    );
};
