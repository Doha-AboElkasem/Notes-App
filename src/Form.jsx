import React, { useState } from "react";

const Form = ({ onSubmit, folders = [] }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedFolderId, setSelectedFolderId] = useState(folders.length > 0 ? folders[0].id : "");

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!content.trim()) {
      newErrors.content = "Content is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
        if (onSubmit) {
            onSubmit({ title, content, folderId: Number(selectedFolderId) });
        }
    setTitle("");
    setContent("");
    setSelectedFolderId(folders.length > 0 ? folders[0].id : "");
  };

return (
    <form
        className="max-w-lg mx-auto p-8 mt-10 bg-white rounded-2xl modern-shadow flex flex-col gap-6 md:max-w-xl w-full animate-fade-in"
        onSubmit={handleSubmit}
    >
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900 text-center tracking-tight animate-slide-down">Add Note</h2>
        <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-medium text-gray-700">
                Title
            </label>
            <input
                id="title"
                type="text"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-full modern-input ${errors.title ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
            />
            {errors.title && (
                <span className="text-red-500 text-sm mt-1">{errors.title}</span>
            )}
        </div>
        <div className="flex flex-col">
            <label htmlFor="content" className="mb-1 font-medium text-gray-700">
                Content
            </label>
            <textarea
                id="content"
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-full resize-none min-h-[100px] modern-input ${errors.content ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter note content"
            />
            {errors.content && (
                <span className="text-red-500 text-sm mt-1">{errors.content}</span>
            )}
        </div>
        <div className="flex flex-col">
            <label htmlFor="folder" className="mb-1 font-medium text-gray-700">
                Department
            </label>
            <select
                id="folder"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-full modern-input bg-gray-50"
                value={selectedFolderId}
                onChange={e => setSelectedFolderId(e.target.value)}
            >
                <option value="">Select Department</option>
                {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                ))}
            </select>
        </div>
        <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl modern-btn font-bold w-full focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 animate-pop"
        >
            <span className="inline-block transition-transform duration-300">Submit</span>
        </button>
        {(errors.title || errors.content) && (
            <div className="text-center text-red-600 text-sm mt-2">
                Please fill in all required fields.
            </div>
        )}
    </form>
);
};

export default Form;
