import { Suspense } from "react";
import Loading from "@/app/portal/dashboard/loading";
import UserForm from "@/components/forms/form-user";
import { getDashboardData } from "@/lib/actions/getDashboardData";
import { getUser } from "@/lib/actions/userActions";
import { User } from "@prisma/client";

async function page(props: any) {

    const data = await getDashboardData()
    const user = await getUser(props.params.id)
    
    return (
        <div className="">
            <Suspense fallback={<Loading />}>
                <UserForm 
                userId={props.params.id}
                searchParams={props.searchParams}
                dashboardData={data}
                userData={user.data as any}
                />
            </Suspense>
        </div>
    );
}

export default page;