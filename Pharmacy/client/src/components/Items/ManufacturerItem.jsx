import React, { useContext } from 'react';
import MyButton from '../UI/button/MyButton';
import styles from './Styles.module.css';
import AuthContext from '../../context/AuthContext';

const ManufacturerItem = (props) => {
    const { isAuth } = useContext(AuthContext);

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    {props.manufacturer.name}
                </div>

            </div>

            {isAuth && (
                <div className={styles.buttons}>
                    <MyButton onClick={() => props.onEdit(props.manufacturer)}>Изменить</MyButton>
                    <MyButton onClick={() => props.onDelete(props.manufacturer.id)}>Удалить</MyButton>
                </div>
            )}

        </div>
    );
};

export default ManufacturerItem;
