import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REG_ROUTE, TICKET_ROUTE } from "./app/consts.tsx";
import Admin from "./pages/AdminPage/Admin";
import Auth from "./pages/AuthPage/Auth.tsx";
import Home from "./pages/HomePage/Home.tsx";
import Ticket from "./pages/TicketPage/Ticket.tsx";
export const AuthRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
]
    

export const PubRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REG_ROUTE,
        Component: Auth,
    },
    {
        path: TICKET_ROUTE,
        Component: Ticket,
    },

]