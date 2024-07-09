import SearchComponent from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/dashboard/pagination";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { getSchools } from "@/lib/actions/schoolActions";

const Page = async () => {
    const schools = await getSchools()

    const data = schools.map((school: any) => {
        return [
            {
                title: "Skolenavn",
                id: school.id,
                image: school?.image,
                data: school?.name
            },
            {
                title: "Brukere",
                id: school.id,
                data: school?.users.length
            },
            {
                title: "Kommune",
                id: school.id,
                data: school?.municipality?.name
            },
            {
                title: "Opprettet",
                id: school.id,
                data: school?.createdAt.toLocaleDateString()
            },
            {
                title: "Oppdatert",
                id: school.id,
                data: school?.updatedAt.toLocaleDateString()
            },
            {
                title: "Status",
                id: school.id,
                data: school?.isActive ? "Aktiv" : "Inaktiv"
            },

        ]
    })

    return (
        <>
          <DashboardTable 
                buttonTitle="Ny skole"
                buttonLink="/portal/dashboard/schools/add"
                category={"schools"}
                data={data}
        />
        </>


    );
}

export default Page;