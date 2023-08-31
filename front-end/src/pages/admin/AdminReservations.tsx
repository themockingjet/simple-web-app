//
//
//

import Card from "../../components/Card";
import Input from "../../components/Input";
import TableReservations from "../../components/withUseQuery/TableReservations";
import ModalReservationDetails from "../../components/Modals/ModalReservationDetails";

import { useDebouncedState } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
const queryClient = new QueryClient();

const AdminReservations = () => {
    //
    const [errorMessage, setErrorMessage] = useState({ status: "", message: "" });

    const [isShow, setIsShow] = useState(false);
    const [search, setSearch] = useDebouncedState("", 300);
    const [rsvData, setRsvData] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        contact_no: "",
        date: new Date(),
        time: "",
    });

    const openModal = (data: any) => {
        setIsShow(true);
        setRsvData(data);
    };

    const onModalClick = () => {
        setIsShow(false);
    };

    return (
        <>
            <div className="grid auto-rows-min grid-cols-4 grid-flow-row gap-4">
                <Card className="p-0 h-12 col-span-4 grid flex items-center justify-center md:justify-start px-4 space-x-2">
                    <label htmlFor="search">Search:</label>
                    <Input id="search" name="search" onChange={(e) => setSearch(e.target.value)} />
                    {errorMessage.status && (
                        <span
                            className={`${
                                errorMessage.status === "error" ? "bg-red-300" : "bg-green-300"
                            } px-4 py-1 rounded-md absolute right-4 animate-pulse`}
                        >
                            {errorMessage.message}
                        </span>
                    )}
                </Card>

                <Card className="p-0 col-span-4 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <QueryClientProvider client={queryClient}>
                        <TableReservations showButton={true} search={search} handleOpenModal={openModal} />
                    </QueryClientProvider>
                </Card>

                {isShow && (
                    <ModalReservationDetails
                        setErrorMessage={setErrorMessage}
                        modalStatus={isShow}
                        handleModalClick={onModalClick}
                        data={rsvData}
                    />
                )}
            </div>
        </>
    );
};

export default AdminReservations;
