import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detalle() {
    const [formData, setFormData] = useState({
        tarea: "",
        usuario: "nancye"
    });

    const headers = {
        'Authorization': '9faa4f2eed9b6c5f9a748d54ed32cc90'
    }
    
    const {id} = useParams();

    useEffect(()=>{
        //cargar el registo que tenga ese id...
        const cargarRegistro = async ()=>{
            try {
                const response = await axios.get(`https://dev4humans.com.mx/api/clases/tareas?usuario=nancye&id=${id}`,{headers});
                setFormData(response.data.data);
                console.log(response);
            } catch (error) {
                console.log("Error en carga de informacion", error); 
                }
        }
        if (id){
            cargarRegistro();
        }
    }, [id])
    
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            if (id) {
                const response = await axios
                .put(
                    `https://dev4humans.com.mx/api/clases/tareas?
                    usuario=nancye&id=${id}`,
                    formData,
                    { headers }
                );
                console.log(response);
            } else {

            const response = await axios 
            .post(
                `https://dev4humans.com.mx/api/clases/tareas`,
                formData,
                { headers }
            );
        console.log(response);
            }
    } catch (error) {
            console.log("Error en carga de informacion", error);
        }
    }
    return (


        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Tarea</label>
                        <input
                            type="text"
                            className="form-control"
                            name="tarea"
                            value={formData.tarea}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </>
    );
}

export default Detalle;