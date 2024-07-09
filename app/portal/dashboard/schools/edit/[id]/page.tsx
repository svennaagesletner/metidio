import { Suspense } from "react";
import Loading from "@/app/portal/dashboard/loading";
import SchoolForm from "@/components/forms/form-school";
import { getDashboardData } from "@/lib/actions/getDashboardData";

async function page(props: { params: { id: string; }; searchParams: any; }) {
    const data = await getDashboardData()
    return (
        <div className="">
            <Suspense fallback={<Loading />}>
                <SchoolForm 
                       schoolId={props.params.id}
                       searchParams={props.searchParams}
                       dashboardData={data}
                />
            </Suspense>
        </div>
    );
}

export default page;