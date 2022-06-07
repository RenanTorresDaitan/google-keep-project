import App from './App';
import './styles.css';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    const app = new App();
  }
});
