//
//
//

import Card from "../Card";
import {useQueryReservations} from "../../hooks/useQuery/useQueryReservations";
import Loading from "../Loading";
import ErrorLoad from "../ErrorLoad";

const CardCounter = (props: any) => {
    //
    const {queryString, title, color} = props;
    //
    const {queryReservationsByStatus} = useQueryReservations();
    const {isError, isLoading, data} = queryReservationsByStatus(queryString);
    //

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorLoad />;
    }

    return (
        <Card className="overflow-hidden p-0 h-24 flex flex-col items-center bg-white border border-gray-200">
            <div className="w-28">
                <span
                    className={`absolute -left-24 -inset-y-12 w-48 h-48 rounded-full bg-${color}-500 flex justify-center items-center`}
                >
                    <span className="ml-20 text-white font-bold text-xl text-center">{data[0]?.count}</span>
                </span>
            </div>
            <div className="flex h-full w-full items-center pl-28 leading-normal">
                <strong className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</strong>
            </div>
        </Card>
    );
};

export default CardCounter;
