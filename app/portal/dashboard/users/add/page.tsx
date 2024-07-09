import { Suspense } from "react";
import Loading from "../../loading";
import UserForm from "@/components/forms/form-user";
import { getDashboardData } from "@/lib/actions/getDashboardData";

async function page() {
    const data = await getDashboardData()

    return (
        <div className="">
            <Suspense fallback={<Loading />}>
                <UserForm
                dashboardData={data}
                />
            </Suspense>
        </div>
    );
} 

export default page;