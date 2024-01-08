import React, { useState, useEffect, useContext } from 'react';
import $axios from '../http/index'
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import MyInput from '../components/UI/Inputs/MyInput';
import ManufacturerCreateForm from '../components/Forms/Manufacturer/ManufacturerCreateForm';
import ManufacturerUpdateForm from '../components/Forms/Manufacturer/ManufacturerUpdateForm';
import './Styles.css'
import AuthContext from '../context/AuthContext';
import ManufacturerList from "../components/Lists/ManufacturerList";

const Manufacturers = () => {
    const { isAuth } = useContext(AuthContext);
    const [manufacturers, setManufacturers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [editingManufacturer, setEditingManufacturer] = useState({ id: 0, name: ''});

    useEffect(() => {
        $axios.get('http://localhost:5000/api/manufacturer')
            .then(response => setManufacturers(response.data))
            .catch(error => console.error('Error fetching manufacturers:', error));
    }, []);

    const searchedManufacturers = searchTerm
        ? manufacturers.filter(manufacturer =>
            manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : manufacturers;


    const sortedManufacturers= sortOrder
        ? [...searchedManufacturers].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
        : searchedManufacturers;


    const createManufacturer = (newManufacturer) => {
        $axios.post('/manufacturer', newManufacturer)
            .then(response => {
                setManufacturers([...manufacturers, response.data]);
                alert('SERVER: created successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModalCreate(false);
    };

    const updateManufacturer = (updatedManufacturer) => {
        $axios.put(`manufacturer${updatedManufacturer.id}`, updatedManufacturer)
            .then(response => {
                const updatedManufacturers = manufacturers.map(manufacturer =>
                    manufacturer.id === updatedManufacturer.id ? response.data : manufacturer
                );
                setManufacturers(updatedManufacturers);
                alert('SERVER: updated successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });

        setModalUpdate(false);
    };

    const deleteManufacturer = (id) => {
        $axios.delete(`/manufacturer/${id}`)
            .then(response => {
                setManufacturers(manufacturers.filter(manufacturer => manufacturer._id !== id));
                alert('SERVER: deleted successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });
    };


    return (
        <div className="page">
            <h1>Страны-производители</h1>

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
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            defaultName="Сортировка"
                            options={[
                                { name: 'По умолчанию', value: '' },
                                { name: 'Алфавит (возрастание)', value: 'asc' },
                                { name: 'Алфавит (убывание)', value: 'desc' }
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
                                <ManufacturerCreateForm
                                    create={createManufacturer}
                                />
                            </MyModal>
                        </>
                    )}

                </div>

                <div className="main-content">

                    {sortedManufacturers.length === 0 ?
                        <h1>Не найдено</h1>
                        :
                        <ManufacturerList
                            manufacturers={sortedManufacturers}
                            onEdit={(manufacturer) => {
                                setEditingManufacturer({ ...manufacturer });
                                setModalUpdate(true);
                            }}
                            onDelete={deleteManufacturer}
                        />
                    }

                    <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
                        <ManufacturerUpdateForm
                            update={updateManufacturer}
                            editingManufacturer={editingManufacturer}
                        />
                    </MyModal>
                </div>
            </div>

        </div>
    );
};

export default Manufacturers;
