import { Dispatch } from "react"
import { Button } from "../ui/button"

interface Props {
    setData: Dispatch<React.SetStateAction<Employee[]>>
}

export const TableNewRow = ({setData, ...props}: Props) => {
    const handleClick = () => setData(prev=> [...prev, { id: "", firstName: "", lastName: "", email: "", role: "" } as unknown as Employee])

    
    return (
        <Button onClick={() => handleClick()}
        >Ny ansatt</Button>
    )
}