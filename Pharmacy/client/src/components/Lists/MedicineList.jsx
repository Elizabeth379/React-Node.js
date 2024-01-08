import React from 'react';
import MedicineItem from '../Items/MedicineItem';

const MedicineList = ({ medicines, onEdit, onDelete }) => {
    return (
        <div>
            {medicines.map(medicine => (
                <MedicineItem
                    key={medicine.id}
                    medicine={medicine}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default MedicineList;
