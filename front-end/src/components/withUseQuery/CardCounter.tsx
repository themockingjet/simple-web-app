//
//
//

import Card from "../Card";
import { useQueryReservations } from "../../hooks/useQuery/useQueryReservations";
import Loading from "../Loading";
import ErrorLoad from "../ErrorLoad";

const CardCounter = (props: any) => {
    //
    const { queryString, title, color } = props;
    //
    const { queryReservationsByStatus } = useQueryReservations();
    const { isError, isLoading, data } = queryReservationsByStatus(queryString);
    //

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorLoad />;
    }

    return (
        <Card className="flex h-24 flex-col items-center overflow-hidden border border-gray-200 bg-white p-0">
            <div className="w-28">
                <span
                    className={`absolute -inset-y-12 -left-24 h-48 w-48 rounded-full bg-${color}-500 flex items-center justify-center`}
                >
                    <span className="ml-20 text-center text-xl font-bold text-white">{data[0]?.count}</span>
                </span>
            </div>
            <div className="flex h-full w-full items-center pl-28 leading-normal">
                <strong className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</strong>
            </div>
        </Card>
    );
};

export default CardCounter;
