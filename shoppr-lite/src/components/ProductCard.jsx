import {Link} from 'react-router-dom';

export default function ProductCard({product}) {

    const imageUrl = `https://developerapis.vercel.app${product.image}`;

    return (
        <div>
            <img src={imageUrl} alt="image" width="150" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            <Link to={`/shop/${product.id}`}>
                View Product 
            </Link>
        </div>
    );
}