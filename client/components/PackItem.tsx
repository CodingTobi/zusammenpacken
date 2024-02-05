import React, { FC } from 'react';
import { PackItemProps } from '../types/packTypes';

const PackItem: FC<PackItemProps> = ({ item, onCheck }) => {
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(item.id, event.target.checked);
  };

  return (
    <div className="flex items-center space-x-2 bg-blue-400 rounded-md p-0.5 pl-1">
      <input type="checkbox" checked={item.checked} onChange={handleCheckChange} className="h-4 w-4 rounded-md" />
      <span className="flex-1">{item.text}</span>
    </div>
  );
};

export default PackItem;