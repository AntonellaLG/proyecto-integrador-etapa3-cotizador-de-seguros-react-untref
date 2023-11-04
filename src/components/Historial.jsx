import React from 'react';
import {Link} from 'react-router-dom';
import useHistorialContext from '../hooks/useHistorialContext';
import {FaClipboardList} from "react-icons/fa6"
import Presupuesto from './Presupuesto';
import '../index.css';

const Historial = () => {
    const{historial} = useHistorialContext();

    return (
        <>   
            <h1 className="center separador">Ver Historial <span className="icono"> < FaClipboardList /> </span></h1>
            <nav className="cotizadorForm">                  
                <nav className="center ">   
                    <ul>
                        {historial.map((cotizacion, index) => (< Presupuesto key={index} {...cotizacion} />
                        ))}
                    </ul>
                </nav>
                <nav className="center">
                    <Link to={"/"}>
                        <button className="button button-outline">VOLVER</button>
                    </Link>
                </nav>
            </nav>
        </>
    );
}


export default Historial;