
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form";
import NotesList from "./NotesList";
import Navbar from "./Navbar";
import FolderList from "./FolderList";
import BurgerMenu from "./BurgerMenu";
import './App.css';

function App() {
  // Notes state
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (note) => {
    setNotes([
      ...notes,
      { id: Date.now(), ...note }
    ]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  // Folder state
  const [folders, setFolders] = useState([
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' }
  ]);
  const [selectedFolderId, setSelectedFolderId] = useState(1);

  const handleAddFolder = (name) => {
    const newId = folders.length > 0 ? Math.max(...folders.map(f => f.id)) + 1 : 1;
    setFolders([...folders, { id: newId, name }]);
  };

  const handleSelectFolder = (id) => {
    setSelectedFolderId(id);
  };

  // Show all notes when 'Total Notes' is clicked
  const handleShowAllNotes = () => {
    setSelectedFolderId('all');
  };

  // Sidebar state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Router>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar totalNotes={notes.length} onTotalNotesClick={handleShowAllNotes} />
        <div className="absolute top-4 left-4">
          <BurgerMenu onClick={toggleSidebar} />
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div className="pt-20 flex min-h-screen bg-gray-50">
        <FolderList
          folders={folders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={handleSelectFolder}
          onAddFolder={handleAddFolder}
          isOpen={isSidebarOpen}
        />
        <div className="flex-1 px-2 md:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Form onSubmit={handleAddNote} folders={folders} />
                  <NotesList
                    notes={notes}
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                    selectedFolderId={selectedFolderId}
                  />
                </>
              }
            />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
