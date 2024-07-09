"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"


export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    const handleToggle = () => {
        theme == "dark" ? setTheme("light") : setTheme("dark")
    }


    return(
      <Button 
       className="dark:bg-neutral-800 hover:transition-opacity dark:hover:bg-neutral-900"
       onClick={handleToggle}
       variant="outline" 
       size="icon"
       >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )

}