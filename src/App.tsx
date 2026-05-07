import { useEffect, useRef, useState } from 'react';
import Coordinator from './components/Coordinator';

type Theme = 'dark' | 'light';

const PULL_THRESHOLD = 70;
const PULL_MAX = 130;

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('outfitCoordinator_theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const tracking = useRef(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('outfitCoordinator_theme', theme);
  }, [theme]);

  // Pull-to-refresh — works inside iOS standalone webview where the
  // browser's native gesture is unavailable.
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (window.scrollY > 0) { tracking.current = false; return; }
      startY.current = e.touches[0].clientY;
      currentY.current = startY.current;
      tracking.current = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!tracking.current) return;
      currentY.current = e.touches[0].clientY;
      const dy = currentY.current - startY.current;
      if (dy <= 0 || window.scrollY > 0) {
        setPullDistance(0);
        return;
      }
      // Apply rubber-band easing so it feels natural
      const eased = Math.min(PULL_MAX, dy * 0.55);
      setPullDistance(eased);
    };
    const onTouchEnd = () => {
      if (!tracking.current) { setPullDistance(0); return; }
      tracking.current = false;
      if (pullDistance >= PULL_THRESHOLD) {
        setRefreshing(true);
        // Cache-busting query so iOS standalone webview re-fetches index.html
        const url = new URL(window.location.href);
        url.searchParams.set('_r', Date.now().toString());
        window.location.replace(url.toString());
      } else {
        setPullDistance(0);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [pullDistance]);

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  const ready = pullDistance >= PULL_THRESHOLD;

  return (
    <>
      {/* Pull-to-refresh indicator */}
      <div
        aria-hidden={pullDistance === 0 && !refreshing}
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: `translate(-50%, ${pullDistance - 50}px)`,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          opacity: refreshing ? 1 : Math.min(1, pullDistance / PULL_THRESHOLD),
          transition: tracking.current ? 'none' : 'transform 0.2s ease, opacity 0.2s ease',
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          display: 'inline-block',
          transform: `rotate(${refreshing ? 0 : pullDistance * 3}deg)`,
          transition: refreshing ? 'transform 0.6s linear' : 'none',
          animation: refreshing ? 'spin 0.9s linear infinite' : undefined,
        }}>
          {ready || refreshing ? '↻' : '↓'}
        </span>
      </div>

      <header className="header">
        <h1>Coordi.</h1>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>

      <main className="content-area" style={{ transform: `translateY(${pullDistance * 0.4}px)`, transition: tracking.current ? 'none' : 'transform 0.2s ease' }}>
        <Coordinator />
      </main>
    </>
  );
}

export default App;
