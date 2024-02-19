import { ADMIN_ROUTE } from "@/app/consts";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ArrowLeft } from "lucide-react";
import FiveLastTickets from "./FiveLastTickets";
import Recharts from "./Recharts";
import TabsStat from "./Tabs";

const Admin_Page_Stat = () => {
  return (
    <div className="containers flex  h-screen flex-wrap">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <a href={ADMIN_ROUTE}>
          <Button className="absolute left-5 top-5 text-center ">
            <ArrowLeft />
          </Button>
        </a>
        <ModeToggle></ModeToggle>
        <div>
          <TabsStat></TabsStat>
        </div>
        <Recharts></Recharts>
        <FiveLastTickets></FiveLastTickets>
      </ThemeProvider>
    </div>
  );
};

export default Admin_Page_Stat;
