// Una función con el mismo nombre del archivo. Y la tengo que exportar
// Debe si o si el hook personalizado utilizar alguno de los hooks de react

import { useState } from "react"

export const useForm = ( estadoInicial = {} ) => {
    const [values, setValues] = useState(estadoInicial)

    const handleInputChange = (e) => {
        const { type, name, checked, value } = e.target
        setValues({
          ...values,
          [name]: type === 'checkbox' ? checked : value
        })
      }

    return [ values, setValues, handleInputChange ]

}

