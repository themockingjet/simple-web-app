//
//
//

import Card from "../../components/Card";
import Input from "../../components/Input";
import TableReservations from "../../components/withUseQuery/TableReservations";
import ModalReservationDetails from "../../components/Modals/ModalReservationDetails";

import { useDebouncedState } from "@mantine/hooks";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const AdminReservations = () => {
    //
    const [errorMessage, setErrorMessage] = useState({ status: "", message: "" });

    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useDebouncedState("", 300);

    const [rsvData, setRsvData] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        contact_no: "",
        date: new Date(),
        time: "",
        status: "",
    });

    const handleOpenModal = (data: any) => {
        setShowModal(true);
        setRsvData(data);
    };

    const handleRefetch = async () => {
        await queryClient.refetchQueries(["reservations_dt"]);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="grid grid-flow-row auto-rows-min grid-cols-4 gap-4 ">
                <Card className="col-span-4 flex h-12 items-center justify-center space-x-2 border border-slate-200 p-0 px-4 md:justify-start">
                    <label htmlFor="search">Search:</label>
                    <Input id="search" name="search" onChange={(e) => setSearch(e.target.value)} />
                    {errorMessage.status && errorMessage.status === "success" && (
                        <span className={`absolute right-4 animate-pulse rounded-md bg-green-300 px-4 py-1`}>
                            {errorMessage.message}
                        </span>
                    )}
                </Card>

                <Card className="col-span-4 flex max-h-[29rem] min-h-[29rem] flex-col overflow-x-auto overflow-y-hidden p-0 pb-2 md:max-h-[32rem] md:min-h-[32rem]">
                    <TableReservations isEditable={true} search={search} handleOpenModal={handleOpenModal} />
                </Card>

                {showModal && (
                    <ModalReservationDetails
                        data={rsvData}
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

export default AdminReservations;
