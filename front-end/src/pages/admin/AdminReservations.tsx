//
//
//

import Card from "../../components/Card";
import Input from "../../components/Input";
import TableReservations from "../../components/withUseQuery/TableReservations";
import ModalReservationDetails from "../../components/Modals/ModalReservationDetails";

import {useDebouncedState} from "@mantine/hooks";
import {useState} from "react";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();

const AdminReservations = () => {
    //
    const [errorMessage, setErrorMessage] = useState({status: "", message: ""});

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
            <div id="my-component" className="grid auto-rows-min grid-cols-4 grid-flow-row gap-4 ">
                <Card className="p-0 h-12 col-span-4 grid flex items-center justify-center md:justify-start px-4 space-x-2 border border-slate-200">
                    <label htmlFor="search">Search:</label>
                    <Input id="search" name="search" onChange={(e) => setSearch(e.target.value)} />
                    {errorMessage.status && errorMessage.status === "success" && (
                        <span className={`bg-green-300 px-4 py-1 rounded-md absolute right-4 animate-pulse`}>
                            {errorMessage.message}
                        </span>
                    )}
                </Card>

                <Card className="p-0 col-span-4 min-h-[29rem] max-h-[29rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
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
