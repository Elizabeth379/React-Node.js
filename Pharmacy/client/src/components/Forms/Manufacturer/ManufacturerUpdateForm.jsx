import React, { useEffect, useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import MyTextArea from '../../UI/Inputs/MyTextArea';
import styles from '../Styles.module.css'

const ManufacturerUpdateForm = ({ update, editingManufacturer }) => {
    const defaultManufacturer = { name: '' };

    const [manufacturer, setManufacturer] = useState(defaultManufacturer);
    const [error, setError] = useState('');

    useEffect(() => setManufacturer(editingManufacturer), [editingManufacturer]);

    const updateManufacturer = (e) => {
        e.preventDefault();

        if (!manufacturer.name) {
            setError('Name is required');
            return;
        }

        if (manufacturer.name.length < 3 || manufacturer.name.length > 50) {
            setError('Name must be between 3 and 50 characters');
            return;
        }

        setError('');
        update(manufacturer);
        setManufacturer(defaultManufacturer);
    };


    return (
        <form class={styles.form}>
            <div class={styles.title}>Изменение страны-производителя</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div class='form-group'>
                <MyInput
                    value={manufacturer.name}
                    onChange={(e) => setManufacturer({ ...manufacturer, name: e.target.value })}
                    type="text"
                    placeholder="Название страны-производителя"
                />
            </div>

            <MyButton onClick={updateManufacturer}>Сохранить</MyButton>
        </form>
    );
};

export default ManufacturerUpdateForm;
