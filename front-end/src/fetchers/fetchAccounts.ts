//
//
//

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function fetchAccounts() {
    //
    const axiosPrivate = useAxiosPrivate();

    const findTableAccounts = async () => {
        //
        const response = await axiosPrivate.get("/api/table/accounts").then((res) => res.data);
        return response;
    };

    return { findTableAccounts };
}
