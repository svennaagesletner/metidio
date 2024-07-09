import SearchComponent from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/dashboard/pagination";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { getMunicipalities } from "@/lib/actions/municipalittyActions";

const Page = async () => {
    const municipalities = await getMunicipalities()

    const data = municipalities.map((municipality: any) => {
        return [
            {
                title: "Kommune",
                id: municipality.id,
                image: municipality?.image,
                data: municipality?.name
            },
            {
                title: "Brukere",
                id: municipality.id,
                data: municipality?.users.length
            },
            {
                title: "Skoler",
                id: municipality.id,
                data: municipality?.schools?.length
            },
            {
                title: "Opprettet",
                id: municipality.id,
                data: municipality?.createdAt.toLocaleDateString()
            },
            {
                title: "Oppdatert",
                id: municipality.id,
                data: municipality?.updatedAt.toLocaleDateString()
            },
            {
                title: "Status",
                id: municipality.id,
                data: municipality?.isActive ? "Aktiv" : "Inaktiv"
            },

        ]
    })

    return (
        <>
          <DashboardTable 
                category="municipalities"
                buttonTitle="Ny kommune"
                buttonLink="/portal/dashboard/municipalities/add"
                data={data}

        />
        </>


    );
}

export default Page;