import { useState, useEffect } from "react";
import axios from "axios";

import Loader from '..//components/Loader';
import { Link } from "react-router-dom";

function Listado() {

    const [tareas, setTareas] = useState([]);
    const [loader, setLoader] = useState(true);

    const headers = {
        'Authorization': '9faa4f2eed9b6c5f9a748d54ed32cc90'
    }

    const getTareas = async () => {
        setLoader(true);
        try {
            const response = await axios.get(`https://dev4humans.com.mx/api/clases/tareas?usuario=nancye`, { headers });
            setTareas(response.data.data);
            console.log(response);
        } catch (error) {
            console.log("Error en carga de informacion", error);
        }
        setLoader(false);
    };

    useEffect(() => {
        console.log("Entro a useEffect aqui deberia cargar mis tareas");
        getTareas();
    }, []);

    const eliminarTarea = async (id) => {
        console.log("El id es el quieres eliminar es" + id);
        try {
        await axios.delete(`https://dev4humans.com.mx/api/clases/tareas?usuario=nancye&id=${id}`,{headers});
            getTareas();
    } catch (error) {
            console.log("Error en carga de informacion", error); 
            }
    }

    if (loader) {
        return (<Loader />)
    }

    return (
        <div className="container">
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Tarea</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tareas.map((tarea, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{tarea.fecha_registros}</td>
                                <td>{tarea.tarea}</td>
                                <td className="text-center">
                                    <Link className="btn btn-info me-2" to={`/editar/${tarea.id}`}>Editar</Link>
                                    <button type="button" className="btn btn-danger"
                                    onClick={()=>eliminarTarea(tarea.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))

                    }
                    {
                        tareas.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No hay tareas
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    );
}

export default Listado;