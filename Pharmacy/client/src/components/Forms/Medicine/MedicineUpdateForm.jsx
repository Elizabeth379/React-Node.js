import React, { useEffect, useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import MyTextArea from '../../UI/Inputs/MyTextArea';
import MySelect from '../../UI/Inputs/MySelect';
import styles from '../Styles.module.css'

const MedicineUpdateForm = ({ update, editingMedicine, types, manufacturers }) => {
    const defaultMedicine = { name: '', price: 0, img: '', type: '', manufacturer: '',  };

    const [medicine, setMedicine] = useState(defaultMedicine);
    const [error, setError] = useState('');

    useEffect(() => setMedicine(editingMedicine), [editingMedicine]);

    const updateMedicine = (e) => {
        e.preventDefault();

        if (!medicine.name) {
            setError('Name is required');
            return;
        }

        if (medicine.name.length < 3 || medicine.name.length > 50) {
            setError('Name must be between 3 and 50 characters');
            return;
        }

        if (medicine.price < 0) {
            setError('Cost cannot be negative');
            return;
        }

        if (!medicine.img) {
            setError('Img is required');
            return;
        }

        if (!medicine.type) {
            setError('Type is required');
            return;
        }

        if (!medicine.manufacturer) {
            setError('Manufacturer is required');
            return;
        }

        setError('');
        update(medicine);
        setMedicine(defaultMedicine);
    };


    return (
        <form class={styles.form}>
            <div className={styles.title}>Изменение лекарства</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div className='form-group'>
                <MyInput
                    value={medicine.name}
                    onChange={(e) => setMedicine({...medicine, name: e.target.value})}
                    type="text"
                    placeholder="Название лекарства"
                />
            </div>

            <div className='form-group'>
                <MyInput
                    value={medicine.price}
                    onChange={(e) => setMedicine({...medicine, price: e.target.value})}
                    type="number"
                    placeholder="Стоимость"
                />
            </div>

            <div className='form-group'>
                <MySelect
                    value={medicine.type}
                    onChange={(e) => setMedicine({...medicine, type: e.target.value})}
                    defaultName="Тип"
                    options={types.map((type) => ({
                        name: type.name,
                        value: type._id,
                    }))}
                />
            </div>

            <div className='form-group'>
                <MySelect
                    value={medicine.manufacturer}
                    onChange={(e) => setMedicine({...medicine, manufacturer: e.target.value})}
                    defaultName="Производитель"
                    options={manufacturers.map((manufacturer) => ({
                        name: manufacturer.name,
                        value: manufacturer._id,
                    }))}
                />
            </div>

            <MyButton onClick={updateMedicine}>Сохранить</MyButton>
        </form>
    );
};

export default MedicineUpdateForm;
