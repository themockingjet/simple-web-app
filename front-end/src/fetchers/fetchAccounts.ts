//
//
//

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function fetchAccounts() {
    //
    const axiosPrivate = useAxiosPrivate();

    const findTableAccounts = async (search: string | undefined) => {
        //
        if (search === undefined) {
            search = "";
        }
        const response = await axiosPrivate.get("/api/table/accounts?search=" + search).then((res) => res.data);
        return response;
    };

    return {findTableAccounts};
}
