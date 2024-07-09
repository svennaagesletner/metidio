import {Skeleton} from "@nextui-org/react";


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (<>
        <div className="p-2">
            <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
        </div>
    
    </>)
  }