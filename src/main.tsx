import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Antes de montar o React');
const rootElement = document.getElementById("root");
console.log('Elemento root:', rootElement);
createRoot(rootElement!).render(<App />);
console.log('Depois de montar o React');
