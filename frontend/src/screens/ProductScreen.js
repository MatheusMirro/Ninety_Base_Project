import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //learn how to use useEffect()
        };
    }, [])
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    return <div>
        <div className="back-to-result">
            <Link to="/">Página inicial</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error} </div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product"></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h2><strong>{product.name}</strong></h2>
                                </li>
                                <li>
                                    <h3> {product.rating} Estrelas ({product.numReviews} Reviews)</h3>
                                </li>
                                <li>
                                    <h3> Preço: <b>${product.price}</b></h3>
                                </li>
                                <li>
                                    Descrição:
                                     <div>
                                        <h3>{product.description}</h3>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Preço: R$ {product.price}
                                </li>
                                <li>
                                    Status: {product.countInStock > 0 ? "Disponivel" : "Indisponivel."}
                                </li>
                                <li>
                                    Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>
                                <li>
                                    {product.countInStock > 0 && <button onClick={handleAddToCart} className="button">Adicionar ao carrinho</button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                )
        }
    </div>
}

export default ProductScreen;