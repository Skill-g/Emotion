import { ADMIN_PAGE_PROFILE, ADMIN_PAGE_THEMES, ADMIN_PAGE_TICKETS, HOME_ROUTE } from "@/app/consts";
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

const Admin = () => {
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
                        <CommandItem><a href={ADMIN_PAGE_TICKETS}>Заявки</a></CommandItem>
                        <CommandItem><a href={ADMIN_PAGE_THEMES}>Темы сайта</a></CommandItem>
                        <CommandItem><a href={HOME_ROUTE}>Выйти</a></CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
        </ThemeProvider>
    );
};

export default Admin;
