//
//
//

import Loading from "../Loading";
import ErrorLoad from "../ErrorLoad";

import {usePagination} from "@mantine/hooks";
import {Pagination} from "@mantine/core";
import {useQueryUsers} from "../../hooks/useQuery/useQueryUsers";
import {format} from "date-fns";

interface TableUsersProps {
    search?: string;
    isEditable: boolean;
    handleOpenModal?: (data: any) => void;
}

const TableUsers = ({isEditable, search, handleOpenModal}: TableUsersProps) => {
    //
    const ITEMS_PER_PAGE = 10;

    const {queryTableUsers} = useQueryUsers();
    const {isError, isLoading, data, result, setResult} = queryTableUsers(ITEMS_PER_PAGE, search);

    const pagination = usePagination({
        total: Math.ceil(data?.length / ITEMS_PER_PAGE),
        initialPage: 1,
        onChange: (page: number) => {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            setResult(data?.slice(start, end));
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorLoad />;
    }

    return (
        <>
            <div className="sticky left-0 flex justify-center items-center h-8 lg:h-10 bg-blue-500">
                <span className="text-white font-semibold text-md md:text-xl lg:text-2xl">Users</span>
            </div>
            <div className="flex flex-col flex-1">
                <table className="shrink-0 table-fixed w-full text-center text-sm md:text-base ">
                    <thead>
                        <tr>
                            <th className="w-44 border-y-2 border-blue-300 text-blue-500 py-2">Full Name</th>
                            <th className="w-24 border-y-2 border-blue-300 text-blue-500 py-2">Birthday</th>
                            <th className="w-44 border-y-2 border-blue-300 text-blue-500 py-2">Contact</th>
                            <th className="w-36 border-y-2 border-blue-300 text-blue-500 py-2">Email</th>
                            {isEditable && <th className="w-28 border-y-2 border-blue-500 bg-blue-500"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {result?.map((user: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-gray-500">{user.first_name + " " + user.last_name}</td>
                                <td className="border-b border-gray-500">
                                    {format(new Date(user.birthday), "MMM dd, yyyy")}
                                </td>
                                <td className="border-b border-gray-500">{user.contact_no}</td>
                                <td className="border-b border-gray-500">{user.email}</td>
                                {isEditable && (
                                    <td className="border-b border-gray-500">
                                        <button
                                            className="px-2 py-1 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                            onClick={() => {
                                                handleOpenModal && handleOpenModal(user);
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="sticky left-0 flex justify-center items-center h-8 lg:h-10 bg-white">
                <div className="flex justify-center">
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

export default TableUsers;
