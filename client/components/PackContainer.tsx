import React from 'react';
import { useState } from 'react';
import PackItem from './PackItem';
import { PackItemType } from '../types/packTypes';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const initialItems: PackItemType[] = [
    { id: 1, text: 'Item 1', checked: false },
    { id: 2, text: 'Item 2', checked: false },
    // Add more items as needed
];

const PackContainer: React.FC = () => {
    const [items, setItems] = useState<PackItemType[]>(initialItems);
    const [title, setTitle] = useState<string>("Pack Title"); 

    const handleCheckChange = (id: string | number, checked: boolean) => {
        setItems(items.map(item => (item.id === id ? { ...item, checked } : item)));
    };

    const handleEditText = (id: string | number, text: string) => {
        setItems(items.map(item => (item.id === id ? { ...item, text } : item)));
    }

    const router = useRouter();

    const handleAddItem = () => {
        const id = items.length + 1;
        setItems([...items, { id, text: `Item ${id}`, checked: false }]);
        router.refresh();
    }

    return (
        <div className="flex flex-col items-stretch w-72 max-w-md space-y-1 bg-slate-200 p-2 m-2 rounded-md h-fit"> {/* Adjust width as needed */}
            <input type='text' value={title} onChange={(ev) => setTitle(ev.target.value)} className="text-center"/>
            {items.map((item) => (
                <PackItem key={item.id} item={item} onCheck={handleCheckChange} onEdit={handleEditText} />
            ))}
            <div onClick={handleAddItem} className="flex items-center justify-center bg-blue-400 p-1 rounded-md">
                <FaPlus />
            </div>
        </div>
    );
};

export default PackContainer;