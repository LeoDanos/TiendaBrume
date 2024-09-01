import { Link } from 'react-router-dom';

export const ItemList = ({ items }) => {
    return (
        <>
            {items.map((i) => (
                <article key={i.id} className={`box b${i.classId}`}>
                    <div>
                        <h5><Link to={`/item/${i.id}`}>{i.title}</Link></h5>
                    </div>
                    <img src={i.imageId} alt={i.title} />
                </article>
            ))}
        </>
    );
};

