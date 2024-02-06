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