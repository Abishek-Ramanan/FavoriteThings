git // src/App.jsx
import React from 'react';
import FavoriteThings from './FavoriteThings';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white from-neutral-content p-4 text-center">Favorite Things</header>
      <div className="flex-1 flex items-center justify-center">
        <FavoriteThings />
      </div>
      <footer className="bg-black-300 p-4 text-center">&copy; @abishek</footer>
    </div>
  );
};

export default App;
