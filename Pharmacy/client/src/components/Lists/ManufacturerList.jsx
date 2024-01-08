import React from 'react';
import TypeItem from '../Items/ManufacturerItem';

const ManufacturerList = ({ manufacturers, onEdit, onDelete }) => {
    return (
        <div>
            {manufacturers.map(manufacturer => (
                <TypeItem
                    key={manufacturer._id}
                    manufacturer={manufacturer}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ManufacturerList;
