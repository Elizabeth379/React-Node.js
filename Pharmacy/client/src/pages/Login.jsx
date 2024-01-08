import React, { useContext, useState } from 'react';
import $api from '../http/index';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MyInput from '../components/UI/Inputs/MyInput';
import MyButton from '../components/UI/button/MyButton';
import './Styles.css'

const Login = () => {
    const { setIsAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.post('/user/login', { email, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            console.log(token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            alert(`SERVER: ${error.response.data.error}`);
            console.error('Authorization error:', error);
        }
    };

    return (
        <div class="loginContainer">
            <div class="loginForm">
                <h2>Авторизация</h2>
                <br></br>

                <form>
                    <div class="form-group">
                        <h3>Почта</h3>
                        <MyInput
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <h3>Пароль</h3>
                        <MyInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <MyButton onClick={handleLogin}>Войти</MyButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
