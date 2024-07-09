const iconClass = "group-hover:text-white transition text-neutral-100 h-[20px] w-[20px]"
import { Users, Sigma, FileBarChart, Shield, Database } from "lucide-react"

const NavItems = [
    {
        id: "dashboard",
        name: "dashboard",
        icon: (<Shield
            className={iconClass}
        />),
        tooltip: "Dashboard",
        href: "/portal/dashboard",
        role: ["SuperAdmin", "MunicipalityAdmin", "SchoolAdmin"],
        minAccessLevel: 4
    },
    {
        id: "humanResources",
        name: "Kompetanse",
        icon: (<Users 
            className={iconClass}
        />),
        tooltip: "Kompetanse",
        href: "/portal/hr",
        role: ["Guest", "Teacher", "Adviser", "SchoolLeader", "SchoolAdmin", "MunicipalityAdmin", "SuperAdmin"],
        minAccessLevel: 1
    },
    {
        id: "summarize",
        name: "Summeringer",
        icon: (<Sigma
            className={iconClass}
        />),
        tooltip: "Sum",
        href: "/portal/overview",
        role: ["Guest", "Teacher", "Adviser", "SchoolLeader", "SchoolAdmin", "MunicipalityAdmin", "SuperAdmin"],
        minAccessLevel: 1
    },

    {
        id: "gsi",
        name: "gsi",
        icon: (<FileBarChart
            className={iconClass}
        />),
        tooltip: "GSI",
        href: "/portal/gsi",
        role: ["SchoolLeader", "SchoolAdmin", "MunicipalityAdmin", "SuperAdmin"],
        minAccessLevel: 3
    },

    {
        id: "masterdata",
        name: "masterdata",
        icon: (<Database
            className={iconClass}
        />),
        tooltip: "Grunndata",
        href: "/portal/masterdata",
        role: ["SchoolLeader", "SchoolAdmin", "MunicipalityAdmin", "SuperAdmin"],
        minAccessLevel: 3
    }
]

export { NavItems, iconClass }