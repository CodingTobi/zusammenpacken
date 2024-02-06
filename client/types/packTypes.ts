export type PackItemType = {
    id: string | number;
    text: string;
    checked: boolean;
};

export type PackItemProps = {
    item: PackItemType;
    onCheck: (id: string | number, checked: boolean) => void;
    onEdit: (id: string | number, text: string) => void;
};

export type PackContainerProps = {
    containerId: string | number;
    title: string;
    items: PackItemData[]; 
  };

export interface PackItemData {
    id: string | number;
    text: string;
    checked: boolean;
}

export interface PackContainerData {
    id: string | number;
    title: string;
    items: PackItemData[];
}

export interface ItemsState {
    [containerId: string]: PackContainerData;
}