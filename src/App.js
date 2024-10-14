import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';  
import './App.css';  
const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallAlert, setShowInstallAlert] = useState(false);

  useEffect(() => {
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (!isAppInstalled) {
      const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
        setShowInstallAlert(true); 
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('El usuario aceptó la instalación');
      } else {
        console.log('El usuario rechazó la instalación');
      }
      setDeferredPrompt(null);
    } else {
      console.log('La instalación no está disponible en este momento');
    }
    setShowInstallAlert(false);
  };

  return (
    <div className="app">
      {showInstallAlert && (
        <div className="install-alert">
          <p>¿Te gustaría instalar nuestra app?</p>
          <button onClick={handleInstallClick}>Instalar App</button>
          <button onClick={() => setShowInstallAlert(false)}>Cerrar</button>
        </div>
      )}

      <TodoList />
    </div>
  );
};

export default App;
