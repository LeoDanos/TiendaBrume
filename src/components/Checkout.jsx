import { useLocation } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { LoadingGif } from './LoadingGif';

export const Checkout = () => {
    const [order, setOrder] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        const state = location.state || {};
        setOrder(state.order || null);
    }, [location]);

    if (!order) {
        return <LoadingGif />; 
    }

    const { id, items, total } = order;

    return (
        <Container className="mt-5">
            <h2>Resumen de la Compra</h2>
            <div className="mb-4">
                <h5><b>ID de Orden:</b> {id}</h5>
            </div>
            <div className="mb-4">
                <h5><b>Turnos:</b></h5>
                {items.map(item => (
                    <div key={item.id} className="mb-2">
                        <p><b>{item.quantity}</b> x <b>{item.title}</b> - Subtotal: ${item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <h5><b>TOTAL ABONADO: $</b>{total}</h5>
            </div>
            <Button variant="dark" href="/">Volver al Inicio</Button>
        </Container>
    );
};
