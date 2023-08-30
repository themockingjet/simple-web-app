//
//
//

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function fetchUsers() {
    //
    const axiosPrivate = useAxiosPrivate();

    const findTableUsers = async () => {
        //
        const response = await axiosPrivate.get("/api/table/users").then((res) => res.data);
        return response;
    };

    return { findTableUsers };
}
