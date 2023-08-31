//
//
//

import Card from "../../components/Card";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import TableAccounts from "../../components/withUseQuery/TableAccounts";
import Input from "../../components/Input";
import {useState} from "react";
import {useDebouncedState} from "@mantine/hooks";
import ModalAccountDetails from "../../components/Modals/ModalAccountDetails";
const queryClient = new QueryClient();

const AdminAccounts = () => {
    //
    const [errorMessage, setErrorMessage] = useState({status: "", message: ""});
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
            <div className="grid auto-cols-4 grid-flow-row-dense auto-rows-min gap-4 ">
                <Card className="h-12 col-span-4 grid grid-cols-4 gap-2 border border-slate-200">
                    <div className="flex items-center px-4 space-x-2">
                        <label htmlFor="search">Search:</label>
                        <Input id="search" name="search" onChange={(e) => setSearch(e.target.value)} />
                        {errorMessage.status && errorMessage.status === "success" && (
                            <span className={`bg-green-300 px-4 py-1 rounded-md absolute right-4 animate-pulse`}>
                                {errorMessage.message}
                            </span>
                        )}
                    </div>
                </Card>

                <Card className="p-0 col-span-4 min-h-[29rem] max-h-[29rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
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
