import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';  // Mantener tu lista de tareas
import './App.css';  // Asegúrate de que este archivo está importado

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallAlert, setShowInstallAlert] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });

    setTimeout(() => {
      setShowInstallAlert(true);
    }, 1000); // Opcional: espera 1 segundo antes de mostrar la alerta
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
      {/* Mostrar alerta personalizada para la instalación */}
      {showInstallAlert && (
        <div className="install-alert">
          <p>¿Te gustaría instalar nuestra app?</p>
          <button onClick={handleInstallClick}>Instalar App</button>
          <button onClick={() => setShowInstallAlert(false)}>Cerrar</button>
        </div>
      )}

      {/* Aquí está tu lista de tareas */}
      <TodoList />
    </div>
  );
};

export default App;
