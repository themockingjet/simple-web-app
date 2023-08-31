//
//
//

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function fetchUsers() {
    //
    const axiosPrivate = useAxiosPrivate();

    const findTableUsers = async (search: string | undefined) => {
        //
        if (search === undefined) {
            search = "";
        }
        const response = await axiosPrivate.get("/api/table/users?search=" + search).then((res) => res.data);
        return response;
    };

    return {findTableUsers};
}
