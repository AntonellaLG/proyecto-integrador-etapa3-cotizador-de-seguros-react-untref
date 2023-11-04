import { useContext } from "react";
import HistorialContext from "../context/HistorialContext";

const useHistorialContext = () => useContext(HistorialContext);

export default useHistorialContext;