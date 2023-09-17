import { ADMIN_PAGE_PROFILE, ADMIN_PAGE_THEMES, ADMIN_PAGE_TICKETS, ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REG_ROUTE, TICKET_ROUTE } from "./app/consts.tsx";
import Admin from "./pages/AdminPage/Admin";
import Admin_Page_Profile from "./pages/AdminPage/Admin_Page_Profile.tsx";
import Admin_Page_Themes from "./pages/AdminPage/Admin_Page_Themes.tsx";
import Admin_Page_Tickets from "./pages/AdminPage/Admin_Page_Tickets.tsx";
import Auth from "./pages/AuthPage/Auth.tsx";
import Home from "./pages/HomePage/Home.tsx";
import Ticket from "./pages/TicketPage/Ticket.tsx";
export const AuthRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: ADMIN_PAGE_TICKETS,
        Component: Admin_Page_Tickets,
    },
    {
        path: ADMIN_PAGE_THEMES,
        Component: Admin_Page_Themes,
    },
    {
        path: ADMIN_PAGE_PROFILE,
        Component: Admin_Page_Profile,
    },
];

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
];
