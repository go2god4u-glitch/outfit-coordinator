import { useEffect, useState } from 'react';
import Coordinator from './components/Coordinator';

type Theme = 'dark' | 'light';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('outfitCoordinator_theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('outfitCoordinator_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className="header">
        <h1>Outfit Coordinator</h1>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>
      
      <main className="content-area">
        <Coordinator />
      </main>
    </>
  );
}

export default App;
