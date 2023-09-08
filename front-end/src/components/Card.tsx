//
//
//

import { forwardRef } from "react";
import { cn } from "../utils/utils";

interface CardInterface {
    //
    className?: string;
    children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardInterface>(({ className, children }: CardInterface, ref) => {
    return (
        <div ref={ref} className={cn("bg-white rounded-lg shadow-lg drop-shadow-md p-2", className)}>
            {children}
        </div>
    );
});

export default Card;
