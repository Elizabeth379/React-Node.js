import React, { useEffect, useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import MyTextArea from '../../UI/Inputs/MyTextArea';
import styles from '../Styles.module.css'

const TypeUpdateForm = ({ update, editingType }) => {
    const defaultType = { name: '' };

    const [type, setType] = useState(defaultType);
    const [error, setError] = useState('');

    useEffect(() => setType(editingType), [editingType]);

    const updateType = (e) => {
        e.preventDefault();

        if (!type.name) {
            setError('Name is required');
            return;
        }

        if (type.name.length < 3 || type.name.length > 50) {
            setError('Name must be between 3 and 50 characters');
            return;
        }

        setError('');
        update(type);
        setType(defaultType);
    };


    return (
        <form class={styles.form}>
            <div class={styles.title}>Изменение типа</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div class='form-group'>
                <MyInput
                    value={type.name}
                    onChange={(e) => setType({ ...type, name: e.target.value })}
                    type="text"
                    placeholder="Название типа"
                />
            </div>

            <MyButton onClick={updateType}>Сохранить</MyButton>
        </form>
    );
};

export default TypeUpdateForm;
