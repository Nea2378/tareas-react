import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Listado from '../pages/Listado';
import Detalle from '../pages/Detalle';

const NotFound = () => <h1>404: Not Found</h1>;

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="404" element={<NotFound />} />
                { /*RUTAS PROPIAS*/ }
                <Route path="home" element={<Home />} />
                <Route path="agregar" element={<Detalle />} />
                <Route path="editar/:id" element={<Detalle />} />
                <Route path="listado" element={<Listado />} />
            </Routes>
        </>
    );
}

export default AppRouter;

