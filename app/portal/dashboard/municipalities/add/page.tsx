import { auth } from "@/auth";
import DashboardAddMunicipality from "@/components/dashboard/dashboard-addMunicipality";
import MunicipalityForm from "@/components/forms/form-municipality";

async function page() {
    const session = await auth()
    
    if (session && session.user.role !== "SuperAdmin") return ( <div className="p-2">Access Denied</div> )
    
    return (
        <div>
            <MunicipalityForm/>
        </div>
    );
}

export default page;