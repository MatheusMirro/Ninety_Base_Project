import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen(props) {

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h2>
                        Carrinho de compras
                </h2>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>
                            Carrinho vazio =(
                </div>
                        :
                        cartItems.map(item =>
                            <li>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>

                                    </div>
                                    <div>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                                            Deletar item
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    R$ {item.price}
                                </div>
                            </li>
                        )
                }

            </ul>
        </div>

        <div className="cart-action">

            <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} itens):
                
            R$ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary" disabled={cartItems.length === 0}>
                Forma de Pagamento
           </button>

        </div>

        <div className="continue-shopping">
            <button> <Link to="/">Continuar comprando</Link></button>
        </div>

    </div>

}

export default CartScreen;