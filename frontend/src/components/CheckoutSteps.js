import React from 'react'

function CheckoutSteps(props) {
    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Conta</div>
        <div className={props.step2 ? 'active' : ''}>Itens</div>
        <div className={props.step3 ? 'active' : ''}>Endereço</div>
        <div className={props.step4 ? 'active' : ''}>Pagamento</div>
        <div className={props.step5 ? 'active' : ''}>Ficha total</div>


    </div>
}

export default CheckoutSteps;