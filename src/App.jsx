import React, { useState } from 'react';
import Engage from './engae';
import OpenPage from './OpenPage';

function App() {
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(true);

  const handleOpen = () => {
    setStarted(true);
    // Unmount the OpenPage after the transition animation finishes (e.g. 1200ms)
    setTimeout(() => {
      setMounted(false);
    }, 1200);
  };

  return (
    <div className="app-viewport">
      {started && (
        <div className="page-transition-enter">
          <Engage />
        </div>
      )}
      {mounted && (
        <OpenPage onOpen={handleOpen} isLeaving={started} />
      )}
    </div>
  );
}

export default App;

