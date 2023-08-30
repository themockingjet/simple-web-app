//
//
//

import { cn } from "../utils/utils";

interface CardInterface {
    //
    className?: string;
    children: React.ReactNode;
}

const Card = ({ className, children }: CardInterface) => {
    return <div className={cn("bg-white rounded-lg shadow-lg drop-shadow-md", className)}>{children}</div>;
};

export default Card;
