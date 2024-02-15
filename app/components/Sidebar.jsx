import { useState } from "react";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <button
        className="p-4 text-gray-500 focus:outline-none focus:shadow-outline-blue"
        onClick={handleToggle}
      >
        {isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
      </button>
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } bg-gray-200 p-4 transition-width duration-300 ease-in-out`}
      >
        <nav>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar