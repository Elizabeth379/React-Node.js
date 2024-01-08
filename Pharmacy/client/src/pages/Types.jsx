import React, { useState, useEffect, useContext } from 'react';
import $axios from '../http/index'
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import MyInput from '../components/UI/Inputs/MyInput';
import TypeCreateForm from '../components/Forms/Type/TypeCreateForm';
import TypeUpdateForm from '../components/Forms/Type/TypeUpdateForm';
import './Styles.css'
import AuthContext from '../context/AuthContext';
import TypeList from '../components/Lists/TypeList';

const Types = () => {
    const { isAuth } = useContext(AuthContext);
    const [types, setTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [editingType, setEditingType] = useState({ name: ''});

    useEffect(() => {
        $axios.get('http://localhost:5000/api/type')
            .then(response => setTypes(response.data))
            .catch(error => console.error('Error fetching types:', error));
    }, []);

    const searchedTypes = searchTerm
        ? types.filter(type =>
            type.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : types;


    const sortedTypes= sortOrder
        ? [...searchedTypes].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
        : searchedTypes;


    const createType = (newType) => {
        $axios.post('/type', newType)
            .then(response => {
                setTypes([...types, response.data]);
                alert('SERVER: created successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModalCreate(false);
    };

    const updateType = (updatedType) => {
        $axios.put(`/type/${updatedType._id}`, updatedType)
            .then(response => {
                const updatedTypes = types.map(type =>
                    type._id === updatedType._id ? response.data : type
                );
                setTypes(updatedTypes);
                alert('SERVER: updated successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });

        setModalUpdate(false);
    };

    const deleteType = (id) => {
        $axios.delete(`/type/${id}`)
            .then(response => {
                setTypes(types.filter(type => type._id !== id));
                alert('SERVER: deleted successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });
    };


    return (
        <div className="page">
            <h1>Типы</h1>

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
                                <TypeCreateForm
                                    create={createType}
                                />
                            </MyModal>
                        </>
                    )}

                </div>

                <div className="main-content">

                    {sortedTypes.length === 0 ?
                        <h1>Не найдено</h1>
                        :
                        <TypeList
                            types={sortedTypes}
                            onEdit={(type) => {
                                setEditingType({ ...type });
                                setModalUpdate(true);
                            }}
                            onDelete={deleteType}
                        />
                    }

                    <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
                        <TypeUpdateForm
                            update={updateType}
                            editingType={editingType}
                        />
                    </MyModal>
                </div>
            </div>

        </div>
    );
};

export default Types;
