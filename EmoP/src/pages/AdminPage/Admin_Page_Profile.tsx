import { ADMIN_ROUTE } from "@/app/consts";
import { TabsProfile } from "@/components/tabs-Profile";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ArrowLeft } from "lucide-react";

const Admin_Page_Profile = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            
        <div className="containers flex justify-center w-auto h-screen content-center flex-wrap">
        <a href={ADMIN_ROUTE}><Button className="absolute left-5 top-5 text-center"><ArrowLeft/></Button></a>
        <ModeToggle></ModeToggle>
            <div className="flex justify-center h-80">
                <TabsProfile/>
                </div>
          
        </div>
        </ThemeProvider>
    );
};

export default Admin_Page_Profile;