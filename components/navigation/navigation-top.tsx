import { Righteous } from "next/font/google"
import ProfileMenu from "../profile/profileBar"
import NavHeader from "./nav-header"

export const NavigationTopbar = async () => {
    return (
        <div className="main-head w-full">
            <div className="py-3 w-full">
                <div className="flex justify-between">
                <div className="flex items-center">
                <NavHeader />
                </div>
                <div className="flex items-center mr-4">
                <ProfileMenu 
                />
                </div>
            </div>
        </div>
    </div>
    )

}
