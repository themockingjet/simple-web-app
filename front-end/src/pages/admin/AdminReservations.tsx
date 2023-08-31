//
//
//

import Card from "../../components/Card";
import Input from "../../components/Input";
import TableReservations from "../../components/withUseQuery/TableReservations";
import ModalReservationDetails from "../../components/Modals/ModalReservationDetails";

import {useDebouncedState} from "@mantine/hooks";
import {useEffect, useState} from "react";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ModalChangeStatus from "../../components/Modals/ModalChangeStatus";
const queryClient = new QueryClient();

const AdminReservations = () => {
    //
    const [errorMessage, setErrorMessage] = useState({status: "", message: ""});

    const [isShow, setIsShow] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [search, setSearch] = useDebouncedState("", 300);

    const [newStatus, setNewStatus] = useState("");
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

    const openModal = (data: any) => {
        setIsShow(true);
        setRsvData(data);
    };

    const handleRefetch = async () => {
        await queryClient.refetchQueries(["reservations_dt"]);
    };

    const onModalClick = () => {
        setIsShow(false);
    };

    const openConfirmationModal = (data: any, new_status: string) => {
        //
        setIsConfirmation(true);
        setRsvData(data);
        setNewStatus(new_status);
        console.log("open");
    };

    const closeConfirmationModal = () => {
        setIsConfirmation(false);
    };
    return (
        <>
            <div id="my-component" className="grid auto-rows-min grid-cols-4 grid-flow-row gap-4">
                <Card className="p-0 h-12 col-span-4 grid flex items-center justify-center md:justify-start px-4 space-x-2">
                    <label htmlFor="search">Search:</label>
                    <Input id="search" name="search" onChange={(e) => setSearch(e.target.value)} />
                    {errorMessage.status && errorMessage.status === "success" && (
                        <span className={`bg-green-300 px-4 py-1 rounded-md absolute right-4 animate-pulse`}>
                            {errorMessage.message}
                        </span>
                    )}
                </Card>

                <Card className="p-0 col-span-4 min-h-[29rem] max-h-[29rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <QueryClientProvider client={queryClient}>
                        <TableReservations
                            isEditable={true}
                            search={search}
                            handleOpenModal={openModal}
                            handleStatusChange={openConfirmationModal}
                        />
                    </QueryClientProvider>
                </Card>

                {isShow && (
                    <ModalReservationDetails
                        data={rsvData}
                        modalStatus={isShow}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        handleModalClick={onModalClick}
                        refresh={handleRefetch}
                    />
                )}
                {isConfirmation && (
                    <ModalChangeStatus
                        data={rsvData}
                        newStatus={newStatus}
                        modalStatus={isConfirmation}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        handleCloseModal={closeConfirmationModal}
                        refresh={handleRefetch}
                    />
                )}
            </div>
        </>
    );
};

export default AdminReservations;
