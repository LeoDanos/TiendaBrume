import { useState } from "react";
import { Button } from 'react-bootstrap';

export const useItemCount = (initialCount = 1, stock) => {
    const [count, setCount] = useState(initialCount);

    const handleIncrese = () => {
        if (count < stock) setCount((prev) => prev + 1);
    };

    const handleDecrese = () => {
        if (count > 1) setCount((prev) => prev - 1);
    };

    const handleAdd = (onAdd) => {
        onAdd(count);
        setCount(1);
    };

    return { count, handleIncrese, handleDecrese, handleAdd };
};

export const ItemCount = ({ onAdd, stock }) => {
    const { count, handleIncrese, handleDecrese, handleAdd } = useItemCount(1, stock);

    return (
        <>
            <Button variant="secondary" onClick={handleDecrese}><b>-</b></Button>
            <span>  <b>{count}</b>  </span>
            <Button variant="secondary" onClick={handleIncrese}><b>+</b></Button>&nbsp;
            <Button variant="dark" onClick={() => handleAdd(onAdd)}><b>Reservar</b></Button>
        </>
    );
};
