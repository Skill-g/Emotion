import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  TICKET_ROUTE,
} from "@/app/consts";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Cookies from "js-cookie";
import {
  HelpCircle,
  Home,
  Menu,
  MessageSquare,
  Shield,
  User,
} from "lucide-react";

const Header = () => {
  const storedIsAuth = Cookies.get("isAuthAdmin");
  const isUser = Cookies.get("isUser");
  return (
    <header>
      <div className="brandname">
        <a href={HOME_ROUTE}>Emotion</a>
      </div>

      <div className="menu">
        <ul>
          <li>
            <a href={HOME_ROUTE}>Главная страница</a>
          </li>
          <li>
            <a href={ABOUT_ROUTE}>Часто задаваемые вопросы</a>
          </li>
          <li>
            <a href={TICKET_ROUTE}>Обращения</a>
          </li>
        </ul>
      </div>
      <div className="loginh">
        {storedIsAuth === "true" ? (
          <a href={ADMIN_ROUTE}>
            Админ панель <Shield />
          </a>
        ) : isUser === "true" ? (
          <a href={PROFILE_ROUTE}>
            Профиль <Home />
          </a>
        ) : (
          <a href={LOGIN_ROUTE}>
            Войти <User />
          </a>
        )}
      </div>

      <div className="mobile-sheet">
        <Sheet>
          <SheetTrigger className="mobile-tapbtn">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Выбор за вами!</SheetTitle>
              <div className="grid gap-4 py-4">
                <div className="menu-mobile mt-4">
                  <ul>
                    <li>
                      <a href={HOME_ROUTE} className="mobile">
                        <Home />
                        <p>Главная страница</p>
                      </a>
                    </li>
                    <li>
                      <a href={ABOUT_ROUTE}>
                        <HelpCircle />
                        <p>Вопросы</p>
                      </a>
                    </li>
                    <li>
                      <a href={TICKET_ROUTE}>
                        <MessageSquare />
                        <p>Обращения</p>
                      </a>
                    </li>
                    {storedIsAuth === "true" ? (
                      <li>
                        <a href={ADMIN_ROUTE}>
                          <Shield />
                          <p>Админ панель</p>{" "}
                        </a>
                      </li>
                    ) : isUser === "true" ? (
                      <li>
                        <a href={PROFILE_ROUTE}>
                          <Home /> <p>Профиль</p>{" "}
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a href={LOGIN_ROUTE}>
                          <User /> <p>Войти</p>{" "}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
