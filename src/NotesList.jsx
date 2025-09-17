import React, { useState } from "react";

const NotesList = ({ notes, onDelete, onEdit, selectedFolderId }) => {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleEditSave = () => {
    if (editTitle.trim() && editContent.trim()) {
      onEdit(editId, { title: editTitle, content: editContent });
      setEditId(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Filter notes by selectedFolderId
  const filteredNotes =
    !selectedFolderId || selectedFolderId === 'all'
      ? notes
      : notes.filter((note) => note.folderId === selectedFolderId);

  return (
    <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-500 col-span-full">No notes yet.</div>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-xl modern-shadow p-6 flex flex-col gap-2 animate-fade-in relative"
          >
            {editId === note.id ? (
              <>
                <input
                  className="border rounded-lg px-3 py-2 modern-input mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                />
                <textarea
                  className="border rounded-lg px-3 py-2 modern-input mb-2 resize-none min-h-[80px]"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit content"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg modern-btn hover:bg-green-600"
                    onClick={handleEditSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg modern-btn hover:bg-gray-400"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{note.title}</h3>
                <p className="text-gray-700 mb-2">{note.content}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg modern-btn hover:bg-indigo-600"
                    onClick={() => startEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg modern-btn hover:bg-red-600"
                    onClick={() => onDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
