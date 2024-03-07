// src/components/FavoriteThings.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FavoriteThings = () => {
  const [favoriteThings, setFavoriteThings] = useState([]);
  const [newThing, setNewThing] = useState({ name: '', description: '', image: '' });
  const [editingThing, setEditingThing] = useState(null);

  useEffect(() => {
    const storedThings = JSON.parse(localStorage.getItem('favoriteThings')) || [];
    setFavoriteThings(storedThings);
  }, []);

  const addFavoriteThing = () => {
    if (newThing.name && newThing.description && newThing.image) {
      const updatedThings = [...favoriteThings, { id: Date.now(), ...newThing }];
      setFavoriteThings(updatedThings);
      localStorage.setItem('favoriteThings', JSON.stringify(updatedThings));
      setNewThing({ name: '', description: '', image: '' });
    }
  };

  const removeFavoriteThing = (id) => {
    const updatedThings = favoriteThings.filter((thing) => thing.id !== id);
    setFavoriteThings(updatedThings);
    localStorage.setItem('favoriteThings', JSON.stringify(updatedThings));
  };

  const startEditing = (thing) => {
    setEditingThing(thing);
  };

  const cancelEditing = () => {
    setEditingThing(null);
  };

  const saveEditing = () => {
    const updatedThings = favoriteThings.map((thing) =>
      thing.id === editingThing.id ? { ...editingThing } : thing
    );
    setFavoriteThings(updatedThings);
    localStorage.setItem('favoriteThings', JSON.stringify(updatedThings));
    setEditingThing(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewThing({ ...newThing, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Favorite Things</h1>
      <div className="flex mb-4 justify-center">
        <input
          type="text"
          placeholder="Name"
          value={newThing.name}
          onChange={(e) => setNewThing({ ...newThing, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newThing.description}
          onChange={(e) => setNewThing({ ...newThing, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="border p-2 mr-2"
        />
        <button onClick={addFavoriteThing} className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {favoriteThings.map((thing) => (
          <motion.li
            key={thing.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <strong className="text-blue-500">{thing.name}</strong>: {thing.description}
            <img src={thing.image} alt={thing.name} className="ml-2 max-w-32 h-auto" />
            <button
              onClick={() => removeFavoriteThing(thing.id)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
            {editingThing && editingThing.id === thing.id && (
              <div className="mt-2">
                <button onClick={saveEditing} className="bg-green-500 text-white p-2 rounded">
                  Save
                </button>
                <button onClick={cancelEditing} className="ml-2 bg-gray-500 text-white p-2 rounded">
                  Cancel
                </button>
              </div>
            )}
            {!editingThing && (
              <button onClick={() => startEditing(thing)} className="ml-2 bg-yellow-500 text-white p-2 rounded">
                Edit
              </button>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteThings;
