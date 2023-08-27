//
//
//

// import TableReservation from "../../components/withUseQuery/TableReservation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const AdminDashboard = () => {
    //
    const axiosPrivate = useAxiosPrivate();

    async function handleClick() {
        try {
            const res = await axiosPrivate.get("/api/user/test");

            if (res) {
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={handleClick}>refresh</button>
        </>
    );

    return (
        <>
            <div className="card lg:ml-2 w-full h-full min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] border border-gray-200 drop-shadow-md">
                <div className="grid grid-flow-row gap-4">
                    <div className="container mx-auto">
                        <div className="flex flex-col">
                            <div className="grid grid-flow-row lg:grid-flow-col gap-4 w-full">
                                <div className="flex justify-center items-center h-24 bg-red-500 rounded-xl text-white shadow-lg">
                                    <h1>Pending</h1>
                                </div>
                                <div className="flex justify-center items-center h-24 bg-green-500 rounded-xl text-white shadow-lg">
                                    <h1>Completed</h1>
                                </div>
                                <div className="flex justify-center items-center h-24 bg-slate-500 rounded-xl text-white shadow-lg">
                                    <h1>Cancelled</h1>
                                </div>
                                <div className="flex justify-center items-center h-24 bg-red-100 rounded-xl">
                                    <h1>Something...</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Table 1 */}
                    <div className="container mx-auto overflow-auto min-h-[744px] max-h-[744px] border border-gray-500 rounded-md">
                        <QueryClientProvider client={queryClient}>{/* <TableReservation /> */}</QueryClientProvider>
                    </div>
                    {/* Table 2 */}
                    <div className="container mx-auto h-36 overflow-auto"></div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
