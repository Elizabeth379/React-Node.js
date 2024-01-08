import React, { useState, useEffect, useContext } from 'react';
import $axios from '../http/index'
import MedicineList from '../components/Lists/MedicineList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import MyInput from '../components/UI/Inputs/MyInput';
import MedicineCreateForm from '../components/Forms/Medicine/MedicineCreateForm';
import MedicineUpdateForm from '../components/Forms/Medicine/MedicineUpdateForm';
import './Styles.css'
import AuthContext from '../context/AuthContext';

const Medicines = () => {
    const { isAuth } = useContext(AuthContext);
    const [medicines, setMedicines] = useState([]);
    const [types, setManufacturers] = useState([]);
    const [manufacturers, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState({ name: '', price: 0, img: '', type: '', manufacturer: '' });

    useEffect(() => {
        $axios.get('/medicine')
            .then(response => setMedicines(response.data))
            .catch(error => console.error('Error fetching medicines:', error));

        $axios.get('/type')
            .then(response => setTypes(response.data))
            .catch(error => console.error('Error fetching types:', error));

        $axios.get('/manufacturer')
            .then(response => setManufacturers(response.data))
            .catch(error => console.error('Error fetching manufacturers:', error));
    }, []);

    const filteredMedicines = selectedType
        ? medicines.filter(medicine => medicine.type._id === selectedType)
        : medicines;

    const filteredSearchedMedicines = searchTerm
        ? filteredMedicines.filter(medicine =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : filteredMedicines;


    const sortedMedicines = sortOrder
        ? [...filteredSearchedMedicines].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.cost - b.cost;
            } else {
                return b.cost - a.cost;
            }
        })
        : filteredSearchedMedicines;

    const createMedicine = (newMedicine) => {
        $axios.post('/medicine', newMedicine)
            .then(response => {
                setMedicines([...medicines, response.data]);
                alert('SERVER: created successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModalCreate(false);
    };

    const updateMedicine = (updatedMedicine) => {
        $axios.put(`/medicine/${updatedMedicine._id}`, updatedMedicine)
            .then(response => {
                const updatedMedicines = medicines.map(medicine =>
                    medicine._id === updatedMedicine._id ? response.data : medicine
                );
                setMedicines(updatedMedicines);
                alert('SERVER: updated successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });

        setModalUpdate(false);
    };

    const deleteMedicine = (id) => {
        $axios.delete(`/medicine/${id}`)
            .then(response => {
                setMedicines(medicines.filter(medicine => medicine._id !== id));
                alert('SERVER: deleted successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });
    };


    return (
        <div className="page">
            <h1>Лекарства</h1>

            <div className="content-container">

                <div className="sidebar">

                    <div class='form-group'>
                        <MyInput
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Название"
                        />
                    </div>

                    <div class='form-group'>
                        <MySelect
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            defaultName="Тип лекарства"
                            options={[
                                { name: 'Все', value: '' },
                                ...types.map(type => ({
                                    name: type.name,
                                    value: type._id
                                }))
                            ]}
                        />
                    </div>

                    <div class='form-group'>
                        <MySelect
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            defaultName="Сортировка"
                            options={[
                                { name: 'По умолчанию', value: '' },
                                { name: 'Цена (возрастание)', value: 'asc' },
                                { name: 'Цена (убывание)', value: 'desc' }
                            ]}
                        />
                    </div>

                    {isAuth && (
                        <>
                            <div class='form-group'>
                                <MyButton onClick={() => setModalCreate(true)} style={{ width: '100%' }}>
                                    Создать
                                </MyButton>
                            </div>

                            <MyModal visible={modalCreate} setVisible={setModalCreate}>
                                <MedicineCreateForm
                                    create={createMedicine}
                                    types={types}
                                    manufacturers={manufacturers}
                                />
                            </MyModal>
                        </>
                    )}

                </div>

                <div className="main-content">

                    {sortedMedicines.length === 0 ?
                        <h1>Не найдено</h1>
                        :
                        <MedicineList
                            medicines={sortedMedicines}
                            onEdit={(medicine) => {
                                setEditingMedicine({ ...medicine, type: medicine.type._id });
                                setModalUpdate(true);
                            }}
                            onDelete={deleteMedicine}
                        />
                    }

                    <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
                        <MedicineUpdateForm
                            update={updateMedicine}
                            editingMedicine={editingMedicine}
                            types={types}
                            manufacturers={manufacturers}
                        />
                    </MyModal>
                </div>
            </div>

        </div>
    );
};

export default Medicines;
