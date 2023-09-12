
import { HOME_ROUTE } from '@/app/consts';
import { AuthRoutes, PubRoutes, } from '@/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
const router = () => {
    const isAuth = false;
    return (
        <Routes>
            {isAuth && AuthRoutes.map(({path , Component}) =>
            <Route key={path} path={path} element={<Component/>} />
            )}
            {PubRoutes.map(({path , Component}) =>
            <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="*" element={ <Navigate to={HOME_ROUTE} replace />} />
        </Routes>
    );
};

export default router;