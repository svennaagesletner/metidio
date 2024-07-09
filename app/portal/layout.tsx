import { NavigationSidebar } from "@/components/navigation/navigation-sidebar"
import { ReactNode } from "react"
import { NavigationBottombar } from "@/components/navigation/navigation-bottom"
import { NavigationTopbar } from "@/components/navigation/navigation-top"
import { GlobalContextProvider } from "@/components/providers/global-provider"


const MainLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="portal-container">
            <GlobalContextProvider>
                <NavigationTopbar />
                    <div className="main-container">
                        <nav className="main-sidebar">
                            <NavigationSidebar />
                        </nav>
                        <div className="main-content">
                            {children}
                        </div>
                    </div>
                <NavigationBottombar />
            </GlobalContextProvider>
        </div>

    )
}

export default MainLayout