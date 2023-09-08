//
//
//

import Loading from "../Loading";
import ErrorLoad from "../ErrorLoad";

import { usePagination } from "@mantine/hooks";
import { Pagination } from "@mantine/core";
import { useQueryReservations } from "../../hooks/useQuery/useQueryReservations";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";

const TableUserReservations = () => {
    //
    const ITEMS_PER_PAGE = 10;
    const { cookies } = useAuth();

    const { queryRereservationByAccountId } = useQueryReservations();
    const { isError, isLoading, data, result, setResult } = queryRereservationByAccountId(ITEMS_PER_PAGE, cookies.id);

    const pagination = usePagination({
        total: Math.ceil(data?.length / ITEMS_PER_PAGE),
        initialPage: 1,
        onChange: (page: number) => {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            setResult(data?.slice(start, end));
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorLoad />;
    }

    return (
        <>
            <div className="sticky left-0 flex h-8 items-center justify-center bg-blue-500 lg:h-10">
                <span className="text-md font-semibold text-white md:text-xl lg:text-2xl">Reservation</span>
            </div>
            <div className="flex flex-1 flex-col">
                <table className="w-full shrink-0 table-fixed text-center text-sm md:text-base ">
                    <thead>
                        <tr>
                            <th className="w-24 border-y-2 border-blue-300 py-2 text-blue-500">Date</th>
                            <th className="w-20 border-y-2 border-blue-300 py-2 text-blue-500">Time</th>
                            <th className="w-24 border-y-2 border-blue-300 py-2 text-blue-500">Status</th>
                            <th className="w-24 border-y-2 border-blue-300 py-2 text-blue-500">Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result &&
                            result.map((reservation: any) => (
                                <tr key={reservation.id}>
                                    <td className="border-b border-gray-500 p-1.5">
                                        {format(new Date(reservation.date), "MMM dd, yyyy")}
                                    </td>
                                    <td className="border-b border-gray-500">
                                        {format(new Date(`2000-01-01 ${reservation.time}`), "hh:mm a")}
                                    </td>
                                    <td className="relative border-b border-gray-500">
                                        <span
                                            className={`rounded-full border px-2 transition duration-200 focus:outline-none 
                                                        ${
                                                            (reservation.status === "PENDING" &&
                                                                "border-yellow-700 bg-yellow-400 ") ||
                                                            (reservation.status === "CONFIRMED" &&
                                                                "border-slate-700 bg-slate-400 ") ||
                                                            (reservation.status === "CANCELLED" &&
                                                                "border-red-700 bg-red-500 ") ||
                                                            (reservation.status === "COMPLETED" &&
                                                                "border-green-700 bg-green-500 ")
                                                        }`}
                                        >
                                            {reservation.status}
                                        </span>
                                    </td>
                                    <td className="border-b border-gray-500">
                                        {format(new Date(reservation.created_at), "MMM dd, yyyy")}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="sticky left-0 flex h-8 items-center justify-center bg-white lg:h-10">
                <div className="flex justify-center">
                    <Pagination
                        value={pagination.active}
                        onChange={pagination.setPage}
                        total={Math.ceil(data?.length / ITEMS_PER_PAGE)}
                    />
                </div>
            </div>
        </>
    );
};

export default TableUserReservations;
