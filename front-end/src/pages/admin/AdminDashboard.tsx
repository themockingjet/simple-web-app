//
//
//

import TableReservations from "../../components/withUseQuery/TableReservations";
import TableAccounts from "../../components/withUseQuery/TableAccounts";
import TableUsers from "../../components/withUseQuery/TableUsers";
import Card from "../../components/Card";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();

const AdminDashboard = () => {
    //

    return (
        <>
            <div className="grid grid-cols-4 grid-flow-row-dense grid-rows-auto gap-4">
                <div className="lg:h-24 row-span-4 col-span-4 grid grid-rows-4 lg:grid-cols-4 gap-2">
                    <Card className="p-0 h-24 shadow-red-500/50">
                        <div className="flex justify-center items-center h-full bg-red-500 rounded-lg text-white  ">
                            <h1>Pending</h1>
                        </div>
                    </Card>
                    <Card className="p-0 h-24 shadow-green-500/50">
                        <div className="flex justify-center items-center h-full bg-green-500 rounded-lg text-white ">
                            <h1>Completed</h1>
                        </div>
                    </Card>

                    <Card className="p-0 h-24 shadow-slate-500/50">
                        <div className="flex justify-center items-center h-full bg-slate-500 rounded-lg text-white ">
                            <h1>Cancelled</h1>
                        </div>
                    </Card>

                    <Card className="p-0 h-24 shadow-cyan-500/50">
                        <div className=" flex justify-center items-center h-full bg-cyan-500 rounded-lg shadow drop-shadow">
                            <h1>Users</h1>
                        </div>
                    </Card>
                </div>

                <Card className="p-0 col-span-4 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <QueryClientProvider client={queryClient}>
                        <TableReservations isEditable={false} />
                    </QueryClientProvider>
                </Card>

                <Card className="p-0 col-span-4 lg:col-span-2 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <QueryClientProvider client={queryClient}>
                        <TableUsers showButton={false} />
                    </QueryClientProvider>
                </Card>

                <Card className="p-0 col-span-4 lg:col-span-2 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <QueryClientProvider client={queryClient}>
                        <TableAccounts showButton={false} />
                    </QueryClientProvider>
                </Card>
            </div>
        </>
    );
};

export default AdminDashboard;
