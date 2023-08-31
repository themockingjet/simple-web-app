//
//
//

import Loading from "../Loading";
import ErrorLoad from "../ErrorLoad";

import {usePagination} from "@mantine/hooks";
import {Pagination} from "@mantine/core";
import {useQueryReservations} from "../../hooks/useQuery/useQueryReservations";
import {format} from "date-fns";

interface TableReservationsProps {
    search?: string;
    isEditable: boolean;
    handleOpenModal?: (data: any) => void;
    handleStatusChange?: (data: any, new_status: string) => void;
}

const TableReservations = ({isEditable, search, handleOpenModal, handleStatusChange}: TableReservationsProps) => {
    //
    const ITEMS_PER_PAGE = 10;

    const {queryTableReservations} = useQueryReservations();
    const {isError, isLoading, data, result, setResult} = queryTableReservations(ITEMS_PER_PAGE, search);

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
            <div className="sticky left-0 flex justify-center items-center h-8 lg:h-10 bg-blue-500">
                <span className="text-white font-semibold text-md md:text-xl lg:text-2xl">Reservation</span>
            </div>
            <div className="flex flex-col flex-1">
                <table className="shrink-0 table-fixed w-full text-center text-sm md:text-base ">
                    <thead>
                        <tr>
                            <th className="w-44 border-y-2 border-blue-300 text-blue-500 py-4">Full Name</th>
                            <th className="w-44 border-y-2 border-blue-300 text-blue-500 py-2">Email</th>
                            <th className="w-36 border-y-2 border-blue-300 text-blue-500 py-2">Contact</th>
                            <th className="w-24 border-y-2 border-blue-300 text-blue-500 py-2">Date</th>
                            <th className="w-20 border-y-2 border-blue-300 text-blue-500 py-2">Time</th>
                            <th className="w-24 border-y-2 border-blue-300 text-blue-500 py-2">Status</th>
                            {isEditable && <th className="w-32 border-y-2 border-blue-500 bg-blue-500"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {result &&
                            result.map((reservation: any) => (
                                <tr key={reservation.id}>
                                    <td className="py-1 lg:py-1.5 border-b border-gray-500">
                                        {reservation.first_name + " " + reservation.last_name}
                                    </td>
                                    <td className="border-b border-gray-500">{reservation.email}</td>
                                    <td className="border-b border-gray-500">{reservation.contact_no}</td>
                                    <td className="border-b border-gray-500">
                                        {format(new Date(reservation.date), "MMM dd, yyyy")}
                                    </td>
                                    <td className="border-b border-gray-500">
                                        {format(new Date(`2000-01-01 ${reservation.time}`), "hh:mm a")}
                                    </td>
                                    <td className="border-b border-gray-500 relative">
                                        <span
                                            className={`rounded-full px-1 border transition duration-200 focus:outline-none 
                                                        ${
                                                            (reservation.status === "PENDING" &&
                                                                "bg-yellow-400 border-yellow-700 ") ||
                                                            (reservation.status === "CONFIRMED" &&
                                                                "bg-slate-400 border-slate-700 ") ||
                                                            (reservation.status === "CANCELLED" &&
                                                                "bg-red-500 border-red-700 ") ||
                                                            (reservation.status === "COMPLETED" &&
                                                                "bg-green-500 border-green-700 ")
                                                        }`}
                                        >
                                            {reservation.status}
                                        </span>
                                    </td>
                                    {isEditable && (
                                        <td className="border-b border-gray-500">
                                            <button
                                                className="rounded-md border border-blue-700 bg-blue-500 px-2 py-1 text-white transition duration-200 hover:bg-blue-700 focus:outline-none"
                                                onClick={() => {
                                                    handleOpenModal && handleOpenModal(reservation);
                                                }}
                                            >
                                                Change/Edit
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="sticky left-0 flex justify-center items-center h-8 lg:h-10 bg-white">
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

export default TableReservations;
