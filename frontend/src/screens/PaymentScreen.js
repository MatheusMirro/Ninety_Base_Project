import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('placeorder')
    }

    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">

                    <li>
                        <h3>Pagamento</h3>
                    </li>

                    <li>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal"
                            onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paymentMethod">
                            Paypal
                    </label>

                    </li>
                    <button type="submit" className="button primary">Continuar </button>
                </ul>
            </form>
        </div>
    </div>

}

export default PaymentScreen;