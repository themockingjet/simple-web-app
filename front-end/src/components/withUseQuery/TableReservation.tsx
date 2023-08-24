//
//
//

import { usePagination } from "@mantine/hooks";
import { Pagination } from "@mantine/core";
import { fetchReservations } from "../../fetchers/reservation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const TableReservation = () => {
    const ITEMS_PER_PAGE = 10;
    const [visibleResults, setVisibleResults] = useState<string[]>([]);
    const { isError, isLoading, data } = useQuery(["reservations"], fetchReservations, {
        staleTime: 60000,
        onSuccess: (data) => {
            setVisibleResults(data.slice(0, ITEMS_PER_PAGE));
        },
    });

    const pagination = usePagination({
        total: Math.ceil(data?.length / ITEMS_PER_PAGE),
        initialPage: 1,
        onChange: (page: number) => {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            setVisibleResults(data?.slice(start, end));
        },
    });

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>Error Occured...</h2>;
    }
    return (
        <>
            {/* <div className="grid grid-flow-row">
                <div className="w-full py-2 text-white uppercase text-center font-bold text-xl bg-blue-500 sticky left-0">
                    Reservations
                </div>

                
                
            </div> */}
            <div className="flex flex-col h-full overflow-auto">
                <div className="w-full py-2 text-white uppercase text-center font-bold text-xl bg-blue-500 sticky left-0">
                    Reservations
                </div>
                <div className="min-w-[1200px] h-full">
                    <table className="table-fixed text-center w-full ">
                        <thead>
                            <tr>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4 w-20">ID</th>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4">Full Name</th>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4">Email</th>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4">Contact</th>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4">Date</th>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4">Time</th>
                                <th className="border-y-2 border-blue-300 text-blue-500 py-4">Status</th>
                                <th className="border-y-2 border-blue-500 bg-blue-500"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleResults?.map((reservation: any, index: any) => (
                                <tr key={index}>
                                    <td className="border-b border-gray-500">{reservation.id}</td>
                                    <td className="border-b border-gray-500">{reservation.full_name}</td>
                                    <td className="border-b border-gray-500">{reservation.email}</td>
                                    <td className="border-b border-gray-500">{reservation.contact_no}</td>
                                    <td className="border-b border-gray-500">{reservation.date}</td>
                                    <td className="border-b border-gray-500">{reservation.time}</td>
                                    <td className="border-b border-gray-500">{reservation.status}</td>
                                    <td className="py-2 border-b border-gray-500">
                                        <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center py-2 sticky left-0">
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

export default TableReservation;
