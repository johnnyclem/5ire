import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-souls', (arg: any) => {
  // eslint-disable-next-line no-console
  localStorage.setItem('theme', arg.darkMode ? 'dark' : 'light');
});
