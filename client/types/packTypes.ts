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