//
//
//

import Card from "../../components/Card";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableAccounts from "../../components/withUseQuery/TableAccounts";
import Input from "../../components/Input";
import { useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import ModalAccountDetails from "../../components/Modals/ModalAccountDetails";
const queryClient = new QueryClient();

const AdminAccounts = () => {
    //
    const [errorMessage, setErrorMessage] = useState({ status: "", message: "" });
    const [search, setSearch] = useDebouncedState("", 300);

    const [userData, setUserData] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (data: any) => {
        setShowModal(true);
        setUserData(data);
    };

    const handleRefetch = async () => {
        await queryClient.refetchQueries(["accounts_dt"]);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="auto-cols-4 grid grid-flow-row-dense auto-rows-min gap-4 ">
                <Card className="col-span-4 grid h-12 grid-cols-4 gap-2 border border-slate-200">
                    <div className="flex items-center space-x-2 px-4">
                        <label htmlFor="search">Search:</label>
                        <Input id="search" name="search" onChange={(e) => setSearch(e.target.value)} />
                        {errorMessage.status && errorMessage.status === "success" && (
                            <span className={`absolute right-4 animate-pulse rounded-md bg-green-300 px-4 py-1`}>
                                {errorMessage.message}
                            </span>
                        )}
                    </div>
                </Card>

                <Card className="col-span-4 flex max-h-[29rem] min-h-[29rem] flex-col overflow-x-auto overflow-y-hidden p-0 pb-2 md:max-h-[32rem] md:min-h-[32rem]">
                    <QueryClientProvider client={queryClient}>
                        <TableAccounts isEditable={true} search={search} handleOpenModal={handleOpenModal} />
                    </QueryClientProvider>
                </Card>
                {showModal && (
                    <ModalAccountDetails
                        data={userData}
                        modalStatus={showModal}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        handleModalClick={handleModalClose}
                        refresh={handleRefetch}
                    />
                )}
            </div>
        </>
    );
};

export default AdminAccounts;
