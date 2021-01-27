import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
        return () => {

        };
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, rePassword));
    }
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">

                <li>
                    <h3>Cadastro</h3>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>Erro na verificação da senha!</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Nome
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Senha </label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="rePassword">Digite a senha novamente </label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                    </input>
                </li>
                <button type="submit" className="button primary">Registrar </button>
                <li>
                    Já possui uma conta?
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">Crie sua conta!</Link>

                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;

//validation signinUser react
//corrigir logica de password & rePassword 