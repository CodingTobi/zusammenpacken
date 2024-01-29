

interface SidebarItemProps {
    icon: React.ReactElement;
    label: string;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
    return (
        <button
            className="flex items-center w-full p-3 transition-colors duration-200 ease-in-out transform hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClick}
            aria-label={label}
        >
            <span className="mx-auto text-gray-200 text-xl">{icon}</span>
        </button>
    );
};

export default SidebarItem;