

interface SidebarItemProps {
    icon: React.ReactElement;
    label: string;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
    return (
        <button
            className="flex items-center w-full p-3 
                transition-colors duration-200 ease-in-out transform 
                hover:bg-slate-400 focus:border-t-stone-100"
            onClick={onClick}
            aria-label={label}
        >
            <span className="mx-auto text-gray-200 text-xl">{icon}</span>
        </button>
    );
};

export default SidebarItem;