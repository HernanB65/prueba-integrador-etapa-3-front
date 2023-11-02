import { createContext, useEffect, useState } from "react";
import { del, get, post, put } from "../utils/http";

/* Creando CONTEXTO */
/* 1er -> Creación del contexto */
const ProductoContext = createContext()

/* 2do -> El armado del Provider */
const url = 'https://integrador-etapa-3-prueba.onrender.com/api/productos/'

const ProductoProvider = ( { children } ) => {
    const [productos, setProductos] = useState(null)

    useEffect(() => {
        obtenerProductos()
    }, []) // <= Array vacío hace solo una petición

   const obtenerProductos = async () => {
    try {
        const products = await get(url)
        setProductos(products)
    } catch (error) {
        console.error(`ERROR obtenerProductos: ${error}`)
    }
   }

   const crearProductoContext = async (productoNuevo) => {
    try {
        // Hago la petición (Guardo producto backend)
        const productoBackNuevo = await post(url, productoNuevo)
        // Actualizar el estado con el nuevo producto
        setProductos([...productos, productoBackNuevo])
    } catch (error) {
        console.error('Falló crearProductoContext', error)
    }
   }

   const actualizarProductoContext = async (productoEditar) => {
    console.log(productoEditar)
    try {
        const productoEditado = await put(url, productoEditar._id, productoEditar)
        console.log(productoEditado)
        //const nuevaDB = productos.map( producto => producto._id === productoEditado._id ? productoEditado : producto )
        const nuevaDB = productos.map( producto => {
            if ( producto._id === productoEditar._id ) {
                return productoEditar
            } else {
                producto
            }
        })
        console.log(nuevaDB)
        setProductos(nuevaDB)
    } catch (error) {
        console.log('ERROR en actualizarProductoContext', error)
    }
   }

   const eliminarProductoContext = async (id) => {
    try {
        const productoEliminado = await del(url, id)
        console.log(productoEliminado) // {}
        const nuevaDB = productos.filter(producto => producto._id !== id)
        setProductos(nuevaDB)
    } catch (error) {
        console.log('Todo salió mal en el eliminarProductoContext', error)
    }
   }

    const data = { productos, crearProductoContext, eliminarProductoContext, actualizarProductoContext }

    return <ProductoContext.Provider value={data}>{children}</ProductoContext.Provider>
}

/* 3er -> Exportaciones */
export { ProductoProvider }

export default ProductoContext
