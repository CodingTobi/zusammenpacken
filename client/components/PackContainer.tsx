import React from 'react';
import PackItem from './PackItem';
import { PackContainerProps } from '../types/packTypes';
import { FaPlus } from 'react-icons/fa';
import { socket } from '../utils/socket';

//CONFIG
const ITEM_DEFAULT_TEXT = "New Item";
const ITEM_DEFAULT_CHECKED = false;

const PackContainer: React.FC<PackContainerProps> = ({ containerId, title, items }) => {

    //Item Handlers
    const handleCheckChange = (id: string | number, checked: boolean) => {
        console.log("PackContainer/handleCheckChange _> Item: Id: ", id, " | Checked: ", checked);
        socket.emit("item:check", {containerId, id, checked });
    };
    const handleEditText = (id: string | number, text: string) => {
        socket.emit("item:edit", {containerId, id, text });
    };

    //Container Handlers
    const handleAddItem = () => {
        socket.emit("container:addItem", { containerId: containerId, text: ITEM_DEFAULT_TEXT, checked: ITEM_DEFAULT_CHECKED });
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        socket.emit("container:editTitle", { containerId: containerId, title: event.target.value });
    }

    //DEBUG
    items.map((item) => (
        console.log("Item: Id: ", item.id, " | Text: ", item.text, " | Checked: ", item.checked, " | ContainerId: ", containerId, " | Title: ", title)
    ));

    return (
        <div className="flex flex-col w-72 min-w-72 space-y-1 bg-slate-200 p-2 m-2 rounded-md h-fit">
            <input type='text' value={title} onChange={handleTitleChange} className="text-center"/>
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