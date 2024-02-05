import React from 'react';
import { useState } from 'react';
import PackItem from './PackItem';
import { PackItemType } from '../types/packTypes';
import { FaPlus } from 'react-icons/fa';

const initialItems: PackItemType[] = [
    { id: 1, text: 'Item 1', checked: false },
    { id: 2, text: 'Item 2', checked: false },
    // Add more items as needed
];

const PackContainer: React.FC = () => {
    const [items, setItems] = useState<PackItemType[]>(initialItems);

    const handleCheckChange = (id: string | number, checked: boolean) => {
        setItems(items.map(item => (item.id === id ? { ...item, checked } : item)));
    };

    return (
        <div className="flex flex-col items-stretch w-72 max-w-md space-y-1 bg-slate-200 p-2 m-2 rounded-md"> {/* Adjust width as needed */}
            {items.map((item) => (
                <PackItem key={item.id} item={item} onCheck={handleCheckChange} />
            ))}
            <div className="flex items-center justify-center bg-blue-400 p-1">
                <FaPlus />
            </div>
        </div>
    );
};

export default PackContainer;