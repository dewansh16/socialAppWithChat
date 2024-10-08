import './App.css';
import './styling/font.css';
import './styling/tag.css';
import './styling/popup.css';
import './styling/button.css';
import './styling/avtar.css';
import './styling/input.css';
import Navigation from './Components/Navigation';
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
    </BrowserRouter>
  );
}

export default App;
