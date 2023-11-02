import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { post } from "../utils/http";

/* CREANDO CONTEXTO */
/* 1er -> Creación del contexto */
const CarritoContext = createContext()
/* 2da -> El armado del Provider */

const url = 'https://integrador-etapa-3-prueba.onrender.com/api/carritos/'

const CarritoProvider = ( { children} ) => {
    const [ agregarAlCarrito, eliminarDelCarrito, limpiarCarrito, carrito ] = useLocalStorage('carrito', [])

    function elProductoEstaEnElCarrito(producto) {
        return carrito.filter(prod => prod.id === producto.id).length
    }
    
    function obtenerProductoDeCarrito(producto) {   
        return carrito.find(prod => prod.id === producto.id)
    }
    
    const agregarCarritoContext = (producto) => {

        if(!elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            agregarAlCarrito(producto)
        } else {
           const productoDeCarrito = obtenerProductoDeCarrito(producto)
           console.log(productoDeCarrito)
           //eliminarDelCarrito(productoDeCarrito.id)
           productoDeCarrito.cantidad++
           window.localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    
    }
    
     
    const eliminarCarritoContext = (id) => {
        eliminarDelCarrito(id)
    }

    const guardarCarritoContext = async () => {
        try {
           const resultado = await post(url, carrito) 
           console.log(resultado)
           limpiarCarrito()
           
        } catch (error) {
            console.error(`Ocurrio un error en guardarCarritoContext()`, error)
        }
        /* Petición asincronica a nuestro banckend */


        /* limpieza del localStorage */
        
        
    }

    const data = {carrito, agregarCarritoContext, eliminarCarritoContext, guardarCarritoContext}

    return <CarritoContext.Provider value={data}>{children}</CarritoContext.Provider>
}

/* 3er -> Exportaciones */

export { CarritoProvider }

export default CarritoContext

