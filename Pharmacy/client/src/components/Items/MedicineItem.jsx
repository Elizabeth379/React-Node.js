import React, { useContext, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import styles from './Styles.module.css';
import AuthContext from '../../context/AuthContext';
import MyModal from '../UI/MyModal/MyModal';
import $axios from '../../http'

const MedicineItem = (props) => {
    const { isAuth } = useContext(AuthContext);
    const [modal, setModal] = useState(false);

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    {props.medicine.name}
                </div>

                <div className={styles.category}>
                    Фото: {props.medicine.img}
                </div>

                <div className={styles.category}>
                    Тип: {props.medicine.typeId}
                </div>

                <div className={styles.category}>
                    Производитель: {props.medicine.manufacturerId}
                </div>

                <div className={styles.cost}>
                    Стоимость: {props.medicine.price}$
                </div>
            </div>


            <div className={styles.buttons}>
                {isAuth && (
                    <>
                    <MyButton onClick={() => props.onEdit(props.medicine)}>Изменить</MyButton>
                        <MyButton onClick={() => props.onDelete(props.medicine._id)}>Удалить</MyButton>
                    </>
                )}

            </div>

        </div>
    );
};

export default MedicineItem;
