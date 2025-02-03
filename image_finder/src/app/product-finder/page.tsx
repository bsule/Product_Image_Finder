import {Skeleton} from "@heroui/skeleton";

export default function ProductFinder() {
    return (
        <div>
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
        </div>
    );
}