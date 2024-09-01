import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import Container from 'react-bootstrap/Container';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const initialValues = {
    phone: "",
    email: "",
    name: "",
}

export const Cart = () => {

    const [buyer, setBuyer] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const { items, removeItem, reset, updateQuantity } = useContext(CartContext);

    const handleChange = (ev) => {
        setBuyer((prev) => {
            return {
                ...prev,
                [ev.target.name]: ev.target.value,
            };
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!buyer.name) formErrors.name = "El nombre es requerido.";
        if (!buyer.phone.match(/^\d{10}$/)) formErrors.phone = "El teléfono debe tener 10 dígitos.";
        if (!buyer.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) formErrors.email = "El email no es válido.";
        return formErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            sendOrder();
        } else {
            setErrors(validationErrors);
        }
    };

    const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

    const sendOrder = () => {
        const order = {
            buyer,
            items,
            total,
        };
    
        const db = getFirestore();
        const orderCollection = collection(db, "ordenes");

        addDoc(orderCollection, order)
            .then(({ id }) => {
                if (id) {
                    withReactContent(Swal).fire({
                        icon: 'success',
                        title: 'Orden Completada',
                        text: `Su orden: ${id} ha sido completada con éxito!`,
                    });
                }
            })
            .finally(() => {
                reset();
                setBuyer(initialValues);
                setErrors({});
            });
    };

    return (
        <Container className="mt-5">
            {items.length > 0 && (
                <>
                    <Button className="mb-5" variant="danger" onClick={reset}>Vaciar Carrito</Button>
                    
                    {items.map((item) => {
                        const handleIncrese = () => {
                            if (item.quantity < item.stock) {
                                updateQuantity(item.id, item.quantity + 1);
                            }
                        };

                        const handleDecrese = () => {
                            if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                            }
                        };

                        return (
                            <div className="mb-4" key={item.id}>
                                <div className="mb-2">
                                    <h5>{item.title}</h5>
                                    <Link to={`/item/${item.id}`}>
                                        <img src={item.imageId} height={124} width={124} style={{ objectFit: 'cover' }} alt={item.title} />
                                    </Link>
                                </div>
                                <div>
                                    <Button variant="secondary" onClick={handleDecrese}><b>-</b></Button>
                                    <b> {item.quantity} </b>
                                    <Button variant="secondary" onClick={handleIncrese}><b>+</b></Button>&nbsp;
                                    <Button variant="danger" onClick={() => removeItem(item.id)}>X</Button>
                                </div>
                                <div style={{ fontSize: "14px", marginTop: "4px" }}><b>Subtotal: </b>${item.price * item.quantity}</div>
                            </div>
                        );
                    })}
                    <div className="mb-4">
                        <h5><b>TOTAL: $</b>{total}</h5>
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={buyer.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={buyer.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={buyer.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="dark" onClick={handleSubmit}>Confirmar Turnos</Button>
                    </Form>
                </>
            )}

            {items.length === 0 && (
                <p>El carrito está vacío<br /><br />Volver al <Link to="/">Inicio</Link></p>
            )}
        </Container>
    );
};