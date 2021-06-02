import { useContext } from 'react';

import AppContext from '../../context/app-context';

import Button from 'react-bootstrap/Button';

import BasketProductImage from '../../assests/images/image-3.jpg';
import './Basket.css';

const Basket = () => {
    const {
        data,
        basket,
        setBasket
    } = useContext(AppContext);

    const removeBasket = (index) => {
        const newBasket = [...basket];
        newBasket.splice(index, 1);
        setBasket(newBasket);
    };

    return (
        <div className="basket-container">
            <h2>Basket</h2>
            <div className="basket-row">
                {basket.map((basketProduct, index) => {
                    return (
                        <div key={index} className="basket-item">
                            <img className="basket-image" src={BasketProductImage} alt="Basket Product" />
                            <p className="basket-name"><b>{basketProduct.name}</b></p>
                            <p className="basket-price">{`£${basketProduct.price} ${data.config.currency} `}</p>
                            <Button
                                variant="danger"
                                onClick={() => removeBasket(index)}
                            >
                                Remove
                            </Button>
                        </div>

                    );
                })}
            </div>
        </div>
    );
}

export default Basket;