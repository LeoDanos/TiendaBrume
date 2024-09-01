import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import cart from '../assets/bagx32.png';

export const CartWidget = () => {
    const { items } = useContext(CartContext);

    const totalItems = items.reduce((acc, act) => acc + act.quantity, 0);

    return (
        <>
            <Link to="/cart"><img className="cartImg" src={cart} height={24} alt="Cart" /></Link>
            {totalItems > 0 && (
                <Link to="/cart"><span className="cartItems">{totalItems}</span></Link>
            )}
        </>
    );
};

