
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Form from "./pages/form"


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>} />
           <Route path="Form" element={<Form/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
