import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaClipboardList} from "react-icons/fa6"
import {ImHome} from "react-icons/im"
import {IoIosSave} from "react-icons/io"
import swal from "sweetalert";
import useHistorialContext from "../hooks/useHistorialContext";
import "../index.css";

function Home(){
    const [propiedades, setPropiedades] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [seleccionPropiedad, setSeleccionPropiedad] = useState('');
    const [seleccionUbicacion, setSeleccionUbicacion] = useState('');
    const [metros2, setMetros2] = useState(20);
    const [guardarVisible, setGuardarVisible] = useState(false);
    const {historial, setHistorial} = useHistorialContext();


    useEffect(() => {
      fetch('../src/data/datos.json')
        .then((response) => response.json())
        .then((data) => {
          const propiedades = data.filter((opcion) => opcion.categoria === 'propiedad');
          const ubicaciones = data.filter((opcion) => opcion.categoria === 'ubicacion');
          
          setPropiedades(propiedades);
          setUbicaciones(ubicaciones);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
    }, []);


    //Actualizo las variables con los datos del form
    const handlePropiedadChange = (event) => {
        setSeleccionPropiedad(event.target.value);
    };
    
    const handleUbicacionChange = (event) => {
        setSeleccionUbicacion(event.target.value);
    };

    const metros2Change = (event) => {
        setMetros2(event.target.value);
    }
      

    //Cotizo
    const handleCotizar = (e) => {
        e.preventDefault();
        //Compruebo si están completos todos los datos correctamente
        if (seleccionPropiedad && seleccionUbicacion && metros2>=20 && metros2<=500) {
            //Obtengo el costo de la póliza
            const costoM2 = 35.86;
            const metros2 = document.querySelector("#metros2").value;

            //Calculo la póliza
            const cotizarPoliza = () => {
                const resultado = costoM2 * seleccionPropiedad * seleccionUbicacion * metros2;
                return resultado.toFixed(2); //Redondea el resultado a dos decimales
            };
  
            const precioPoliza = cotizarPoliza();

            //Actualizo el valor en el elemento HTML
            const valorPolizaElement = document.getElementById("valorPoliza");
            valorPolizaElement.innerText = precioPoliza;

            setGuardarVisible(true); //Muestro el icono de guardar

            swal({
                title: '', 
                text: 'Cotización realizada con éxito.',
                icon: 'success',
                timer: 2500,
                buttons:['']
            });

        //Si los datos no están completos correctamente doy una alerta
        } else {
          swal({
            title: '', 
            text: 'Debes completar adecuadamente los datos en pantalla.',
            icon: 'warning',
            timer: 2500,
            buttons:['']});
        }
    };


    //Guardo la info cotizada
    const guardar = () => {
        //Defino variables que me guarden los tipos del JSON, ya que seleccionPropiedad y seleccionUbicacion guardan los respectivos factores
        const tipoPropiedad = propiedades.find((opcion) => opcion.factor === parseFloat(seleccionPropiedad))?.tipo;
        const tipoUbicacion = ubicaciones.find((opcion) => opcion.factor === parseFloat(seleccionUbicacion))?.tipo;

        const costoM2 = 35.86;
        //Calculo la póliza
        const cotizarPoliza = () => {
            const resultado = costoM2 * seleccionPropiedad * seleccionUbicacion * metros2;
            return resultado.toFixed(2);
        };

        //Guardo estos datos para el historial
        const nuevaPoliza = {};
            nuevaPoliza["Fecha de cotización: "] = new Date().toLocaleString();
            nuevaPoliza["Propiedad: "] = tipoPropiedad;
            nuevaPoliza["Ubicación: "] = tipoUbicacion;
            nuevaPoliza["Metros cuadrados: "] = metros2;
            nuevaPoliza["Póliza mensual: $"] = cotizarPoliza(); 

        setHistorial([...historial, nuevaPoliza]);
        
        //Hago una alerta para el guardado
        swal({
            title: '', 
            text: 'Guardado exitosamente.',
            icon: 'success',
            timer: 2500,
            buttons:['']
        });
    }

      
    //https://react-icons.github.io/react-icons/
    return(
        <section className="home">
            <nav id="historial">
                <Link to={"/historial"}>
                    <span className="icono" title="Ver Historial"> <FaClipboardList /> </span>
                </Link>
            </nav>
            <h1 className="center separador">Seguros del hogar <span className="icono"><ImHome/></span></h1> 
            <form className="center cotizadorForm">
                <h2 className="center separador">Completa los datos solicitados</h2>
                <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
                <select id="propiedad" value={seleccionPropiedad} onChange={handlePropiedadChange}>
                    <option value="">...</option>
                    {propiedades.map((opcion) => (
                        <option key={opcion.tipo} value={opcion.factor}>
                        {opcion.tipo}
                        </option>
                    ))}
                </select>
                <label htmlFor="ubicacion">Selecciona su ubicación</label>
                <select id="ubicacion" value={seleccionUbicacion} onChange={handleUbicacionChange}>
                    <option value="">...</option>
                    {ubicaciones.map((opcion) => (
                        <option key={opcion.tipo} value={opcion.factor}>
                            {opcion.tipo}
                        </option>
                    ))}
                </select>
                <label htmlFor="metros2">Ingresa los Metros cuadrados (entre 20 y 500):</label>
                <input type="number" id="metros2" defaultValue="20" min="20" max="500" onChange={metros2Change} ></input>
                <section className="center separador">
                    <button onClick={handleCotizar} className="boton-cotizar">
                        Cotizar
                    </button>
                </section>
                <section className="center separador">
                    <p className="importe">Precio estimado: $ <span id="valorPoliza">0.00</span>{guardarVisible && <span onClick={guardar} className="guardar" title="Guardar en historial"> <IoIosSave /> </span>}</p>
                </section>
            </form>
        </section>
    )
}


export default Home;