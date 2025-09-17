import React, { useState } from "react";

const FolderList = ({ folders, selectedFolderId, onSelectFolder, onAddFolder, isOpen = true }) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleAdd = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName("");
    }
  };

return (
    <aside
        className={`
            fixed top-0 left-0 z-40 w-72 h-full bg-white border-r border-gray-200 flex flex-col shadow-xl rounded-r-2xl
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:static md:z-auto md:translate-x-0 md:flex md:w-72
        `}
    >
        <div className="flex-1 overflow-y-auto px-2 pt-6 pb-2 bg-gray-50 rounded-t-2xl md:bg-white md:rounded-none py-10">
            <h2 className="text-lg font-bold text-blue-700 mb-4 pl-2">Folders</h2>
            <ul className="space-y-2">
                {folders.map((folder) => (
                    <li
                        key={folder.id}
                        className={`cursor-pointer px-4 py-2 rounded-xl transition-all font-medium text-gray-700 border border-transparent hover:border-blue-400 hover:bg-blue-50 shadow-sm ${
                            folder.id === selectedFolderId ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-gray-100"
                        }`}
                        onClick={() => onSelectFolder(folder.id)}
                    >
                        {folder.name}
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-4 border-t border-gray-100 flex gap-2 bg-gray-50 rounded-b-2xl">
            <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow"
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-1 rounded-md font-semibold shadow hover:from-blue-600 hover:to-indigo-700 text-sm transition-all"
                onClick={handleAdd}
            >
                Add
            </button>
        </div>
    </aside>
);
};

export default FolderList;
