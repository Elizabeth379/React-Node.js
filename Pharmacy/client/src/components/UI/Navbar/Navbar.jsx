import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import AuthContext from '../../../context/AuthContext';

function Navbar() {
    const { isAuth } = useContext(AuthContext);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

    const date = new Date().toLocaleString(undefined, dateOptions); // und - локаль
    const localTime = new Date().toLocaleTimeString(undefined, timeOptions);

    const utcDateOptions = { ...dateOptions, timeZone: 'UTC' };
    const utcDate = new Date().toLocaleString(undefined, utcDateOptions);
    const utcTimeOptions = { ...timeOptions, timeZone: 'UTC' };
    const utcTime = new Date().toLocaleTimeString(undefined, utcTimeOptions);


    return (
        <nav>
            <ul>
                <div>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                    </li>
                    <li>
                        <Link to="/faq">FAQ</Link>
                    </li>
                    <li>
                        <Link to="/medicines">Лекарства</Link>
                    </li>
                    {isAuth && (
                        <>
                            <li>
                                <Link to="/types">Типы</Link>
                            </li>
                            <li>
                                <Link to="/manufacturers">Производители</Link>
                            </li>
                        </>
                    )}
                </div>

                <div style={{color: "white"}}>
                    <li>
                        {userTimezone}
                    </li>
                    <li>
                        {date}
                    </li>
                    <li>
                        {localTime}
                    </li>
                    <li>
                        {utcDate}
                    </li>
                    <li>
                        {utcTime}
                    </li>
                </div>

                <div>
                    {!isAuth && (
                        <>
                            <li>
                            <Link to="/login">Войти</Link>
                            </li>
                            <li>
                                <Link to="/register">Регистрация</Link>
                            </li>
                        </>
                    )}

                    {isAuth && (
                        <li>
                            <Link to="/logout">Выйти</Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
