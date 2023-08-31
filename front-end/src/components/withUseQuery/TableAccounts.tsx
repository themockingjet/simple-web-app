//
//
//

import Loading from "../Loading";
import ErrorLoad from "../ErrorLoad";

import {usePagination} from "@mantine/hooks";
import {Pagination} from "@mantine/core";
import {useQueryAccounts} from "../../hooks/useQuery/useQueryAccounts";
import {format} from "date-fns";

interface TableAccountsProps {
    search?: string;
    isEditable: boolean;
    handleOpenModal?: (data: any) => void;
}

const TableAccounts = ({isEditable, search, handleOpenModal}: TableAccountsProps) => {
    //
    const ITEMS_PER_PAGE = 10;

    const {queryTableAccounts} = useQueryAccounts();
    const {isError, isLoading, data, result, setResult} = queryTableAccounts(ITEMS_PER_PAGE, search);

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
                <span className="text-white font-semibold text-md md:text-xl lg:text-2xl">Accounts</span>
            </div>
            <div className="flex flex-col flex-1">
                <table className="shrink-0 table-fixed w-full text-center text-sm md:text-base ">
                    <thead>
                        <tr>
                            <th className="w-12 lg:w-20 border-y-2 border-blue-300 text-blue-500 py-2">ID</th>
                            <th className="w-32 border-y-2 border-blue-300 text-blue-500 py-2">Email</th>
                            <th className="w-24 border-y-2 border-blue-300 text-blue-500 py-2">Role</th>
                            <th className="w-44 border-y-2 border-blue-300 text-blue-500 py-2">Date Created</th>
                            {isEditable && <th className="w-28 border-y-2 border-blue-500 bg-blue-500"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {result?.map((account: any, index: any) => (
                            <tr key={index}>
                                <td className="py-1 border-b border-gray-500">{account.id}</td>
                                <td className="border-b border-gray-500">{account.email}</td>
                                <td className="border-b border-gray-500">{account.is_admin === 1 ? "Admin" : "User"}</td>
                                <td className="border-b border-gray-500">
                                    {format(new Date(account.created_at), "dd/MM/yyyy h:mm a")}
                                </td>
                                {isEditable && (
                                    <td className="border-b border-gray-500">
                                        <button className="px-2 py-1 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
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

export default TableAccounts;
