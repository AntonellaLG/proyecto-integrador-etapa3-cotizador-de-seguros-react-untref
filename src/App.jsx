import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Historial from './components/Historial';
import useLocalStorage from './hooks/useLocalStorage';
import HistorialContext from "./context/HistorialContext";
import './index.css';

const App = () => {
    const [historial, setHistorial] = useLocalStorage("historial", []);

    return (
        <>
            <HistorialContext.Provider value={{historial, setHistorial}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/historial" element={<Historial />}/>
                    </Routes>
                </BrowserRouter>
            </HistorialContext.Provider>
        </>
    );
};

  
export default App;
