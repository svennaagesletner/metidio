import SearchComponent from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/dashboard/pagination";
import { getUsers } from "@/lib/actions/userActions";
import DashboardTable from "@/components/dashboard/dashboard-table";

const UsersPage = async () => {
    const users = await getUsers()

    const data = users.map((user) => {
        return [
            {
                title: "Navn",
                id: user.id,
                image: user?.image,
                data: user?.name
            },
            {
                title: "E-post",
                id: user.id,
                data: user?.email
            },
            {
                title: "Skole",
                id: user.id,
                data: user?.school?.name
            },
            {
                title: "Kommune",
                id: user.id,
                data: user?.municipality?.name
            },
            {
                title: "Opprettet",
                id: user.id,
                data: user?.createdAt.toLocaleDateString()
            },
            {
                title: "Oppdatert",
                id: user.id,
                data: user?.updatedAt.toLocaleDateString()
            },
            {
                title: "Rolle",
                id: user.id,
                data: user?.role
            },
            {
                title: "Status",
                id: user.id,
                data: user?.isActive ? "Aktiv" : "Inaktiv"
            },

        ]
    })

    return (
        <>
          <DashboardTable 
                buttonTitle="Ny bruker"
                buttonLink="/portal/dashboard/users/add"
                category={"users"}
                data={data}

        />
        </>


    );
}

export default UsersPage;