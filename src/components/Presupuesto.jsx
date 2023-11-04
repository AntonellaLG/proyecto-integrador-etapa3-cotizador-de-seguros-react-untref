const Presupuesto = (propiedades) => {
    return (
        <li>
            {Object.keys(propiedades).map((propiedad, indice) => (
                <p key={indice}>
                    <b>{propiedad}</b> {propiedades[propiedad]}</p>
            ))}
        </li>
    )
}

export default Presupuesto;