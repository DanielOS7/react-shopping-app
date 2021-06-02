import { useEffect, useContext } from 'react';

import AppContext from '../../context/app-context';
import { hasTolerableLimit } from '../../utils/tolerable-limit';

import Button from 'react-bootstrap/Button';

import ProductImage from '../../assests/images/image-2.jpeg';
import './Products.css';

const Products = () => {
    const {
        data,
        setData,
        basket,
        setBasket,
        setMessage,
        setShowModal
    } = useContext(AppContext);

    useEffect(() => {
        fetch('https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    const addBasket = (product) => {
        const { tolerableUpperLimits } = data.config;

        if (hasTolerableLimit(basket, product, tolerableUpperLimits)) {
            setMessage('Maximum level of daily nutrient intake reached in basket');
            setShowModal(true);
        } else {
            setBasket([...basket, { ...product }]);
        }
    }

    return (
        <div className="products-container">
            <h2>Products</h2>
            <div className="products-row">
                {data.products.length > 0 && data.products.map((product) => {
                    return (
                        <div key={product.name} className="products-item">
                            <img className="product-image" src={ProductImage} alt="Product" />
                            <p className="product-name"><b>{product.name}</b></p>
                            <p className="product-price">{`£${product.price} ${data.config.currency} `}</p>
                            <Button
                                variant="secondary"
                                onClick={() => addBasket(product, product.nutrients)}
                            >
                                Add to basket
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;