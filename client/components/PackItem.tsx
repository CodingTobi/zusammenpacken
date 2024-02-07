import React, { FC, useState } from 'react';
import { PackItemProps } from '../types/packTypes';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

const PackItem: FC<PackItemProps> = ({ item, onCheck, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("PackItem/handleCheckChange _> Item: Id: ", item.id, " | Text: ", item.text, " | Checked: ", event.target.checked);
    onCheck(item.id, event.target.checked);
  };

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(item.id, event.target.value);
  }

  const handleDelete = () => {
    onDelete(item.id);
  }



  return (
    <div className={`flex items-center space-x-2 bg-blue-400 rounded-md p-0.5 pl-1 ${(item.checked) ? "opacity-75" : ""}`}>
      <input type="checkbox" checked={item.checked} onChange={handleCheckChange} className="h-4 w-4 rounded-md" />
      {
        editMode ?
          <>
            <input type='text' className='flex-1' value={item.text} autoFocus onBlur={() => setEditMode(!editMode)} onChange={handleEdit} />
          </> : <>
            <span className="flex-1">{item.text}</span>
            <button className=' px-1' onClick={() => setEditMode(!editMode)}><MdEdit /></button>
            <button className='float-right pr-1' onClick={handleDelete}><FaTrash /></button>

          </> 
      }
    </div>
  );
};

export default PackItem;