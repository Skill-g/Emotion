import {
  ADMIN_PAGE_PROFILE,
  ADMIN_PAGE_STAT,
  ADMIN_PAGE_THEMES,
  ADMIN_PAGE_TICKETS,
  HOME_ROUTE,
  LOGIN_ROUTE
} from "@/app/consts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Admin = () => {
  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthAdmin = Cookies.get("isAuthAdmin");
    setIsAuthenticated(isAuthAdmin === "true");
  }, []);

  const handleLogout = () => {
    Cookies.remove("isAuthAdmin");
    localStorage.removeItem("authExpiration");
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="containers h-screen">
        <ModeToggle></ModeToggle>
        <Command className="full-width-link">
          <CommandInput placeholder="Введите название" />
          <CommandList>
            <CommandEmpty>Нет результатов.</CommandEmpty>
            <CommandGroup heading="Разделы панели администратора">
              <CommandItem>
                <a href={ADMIN_PAGE_PROFILE}>Профиль</a>
              </CommandItem>
              <CommandItem>
                <a href={ADMIN_PAGE_TICKETS}>Заявки</a>
              </CommandItem>
              <CommandItem>
                <a href={ADMIN_PAGE_THEMES}>
                  Чат с пользователями (Данная вкладка в разработке)
                </a>
              </CommandItem>
              <CommandItem>
                <a href={ADMIN_PAGE_STAT}>
                  Статистика и данные (Данная вкладка почти работает)
                </a>
              </CommandItem>
              <CommandItem>
                <a href={HOME_ROUTE}>Выйти</a>
              </CommandItem>
              <CommandItem>
                <a onClick={handleLogout} href={LOGIN_ROUTE}>
                  Выйти из профиля администратора{" "}
                </a>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </ThemeProvider>
  );
};

export default Admin;
