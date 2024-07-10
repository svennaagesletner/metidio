import DashboardMain from "@/components/dashboard/dashboard-main";
import { getDashboardData } from "@/lib/actions/getDashboardData";

const page = async () => {
 
  const dashboardData = await getDashboardData()


  return (
    <main>
          <DashboardMain
          dashboardData={dashboardData}
          />
    </main>
  );
}

export default page;