import {
  ABOUT_ROUTE,
  ADMIN_PAGE_PROFILE,
  ADMIN_PAGE_STAT,
  ADMIN_PAGE_TICKETS,
  ADMIN_ROUTE,
  CHAT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REG_ROUTE,
  TICKET_ROUTE
} from "./app/consts.tsx";
import About from "./pages/AboutUsPage/About.tsx";
import Admin from "./pages/AdminPage/Admin.tsx";
import Admin_Page_Profile from "./pages/AdminPage/Admin_Page_Profile.tsx";
import Admin_Page_Stat from "./pages/AdminPage/Admin_Page_Stat/Admin_Page_Stat.tsx";
import Admin_Page_Tickets from "./pages/AdminPage/Admin_Page_Tickets.tsx";
import Auth from "./pages/AuthPage/Auth.tsx";
import Reg from "./pages/AuthPage/Reg.tsx";
import Chat from "./pages/ChatPage/Chat.tsx";
import Home from "./pages/HomePage/Home.tsx";
import Profile from "./pages/ProfilePage/Profile.tsx";
import Ticket from "./pages/TicketPage/Ticket.tsx";
export const AuthRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: ADMIN_PAGE_PROFILE,
    Component: Admin_Page_Profile,
  },
  {
    path: ADMIN_PAGE_STAT,
    Component: Admin_Page_Stat,
  },
  {
    path: ADMIN_PAGE_TICKETS,
    Component: Admin_Page_Tickets,
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
    Component: Reg,
  },
  {
    path: TICKET_ROUTE,
    Component: Ticket,
  },
  {
    path: ABOUT_ROUTE,
    Component: About,
  },
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
];

export const UserRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];
