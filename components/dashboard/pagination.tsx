import { Button } from "../ui/button";

function Pagination() {
    return (
        <div className="flex flex-row justify-between">
            <Button disabled>Forrige</Button>
            <Button>Neste</Button>
        </div>
    );
}

export default Pagination;