//
//
//

import Card from "../../components/Card";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Input from "../../components/Input";
import { useState } from "react";
import TableAccounts from "../../components/withUseQuery/TableAccounts";
const queryClient = new QueryClient();

const AdminAccounts = () => {
    //

    return (
        <>
            <div className="grid auto-cols-4 grid-flow-row-dense grid-rows-auto gap-4">
                <Card className="h-12 col-span-4 grid grid-cols-4 gap-2">
                    <div className="flex items-center px-4 space-x-2">
                        <label htmlFor="search">Search:</label>
                    </div>
                </Card>

                <Card className="col-span-4 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <QueryClientProvider client={queryClient}>
                        <TableAccounts showButton={true} />
                    </QueryClientProvider>
                </Card>
            </div>
        </>
    );
};

export default AdminAccounts;
