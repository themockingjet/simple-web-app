//
//
//

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../fetchers/fetchUsers";
import { useState } from "react";

export function useQueryUsers() {
    //
    const { findTableUsers } = fetchUsers();

    const queryTableUsers = (ITEMS_PER_PAGE: number) => {
        //
        const [result, setResult] = useState([]);
        const { isError, isLoading, data } = useQuery(["users"], findTableUsers, {
            cacheTime: 600000,
            retry: 3,
            onSuccess: (data: any) => {
                setResult(data.slice(0, ITEMS_PER_PAGE));
            },
        });

        return { isError, isLoading, data, result, setResult };
    };

    return { queryTableUsers };
}
