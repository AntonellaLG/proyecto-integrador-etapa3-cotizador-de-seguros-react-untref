import { useState, useEffect } from "react";

//En el estado guardamos la info y cada vez que actualicemos los datos, vamos a usar useEffect para actualizar el localStorage
//clave para leerla del localStorage, y valorInicial por si no existe el item (tengo el valorInicial como referencia)
const useLocalStorage = (clave, valorInicial) => {
  const obtenerLocal = () => {
    if (localStorage.getItem(clave)) {
      return JSON.parse(localStorage.getItem(clave));
    }
    localStorage.setItem(clave, JSON.stringify(valorInicial));
    return valorInicial;
  };
  const [valor, setValor] = useState(()=>obtenerLocal());
  //Cada vez que cambie el valor, en la clave se va a actualizar el valor que tenga actualmente ese dato
  //Persistimos los datos del LocalStorage
  useEffect(() => localStorage.setItem(clave, JSON.stringify(valor)), [valor]);
  return [valor, setValor]; //valor para que lo podamos consumir, setValor para que lo podamos actualizar
};

export default useLocalStorage;