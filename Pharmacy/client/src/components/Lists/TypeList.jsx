import React from 'react';
import TypeItem from '../Items/TypeItem';

const TypeList = ({ types, onEdit, onDelete }) => {
    return (
        <div>
            {types.map(type => (
                <TypeItem
                    key={type._id}
                    type={type}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TypeList;
