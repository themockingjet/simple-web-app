//
//
//

import {useQuery} from "@tanstack/react-query";
import {fetchAccounts} from "../../fetchers/fetchAccounts";
import {useState} from "react";

export function useQueryAccounts() {
    //
    const {findTableAccounts} = fetchAccounts();

    const queryTableAccounts = (ITEMS_PER_PAGE: number, search: string | undefined) => {
        //
        const [result, setResult] = useState([]);
        const {isError, isLoading, data} = useQuery(["accounts_dt", search], () => findTableAccounts(search), {
            cacheTime: 600000,
            retry: 3,
            onSuccess: (data: any) => {
                setResult(data.slice(0, ITEMS_PER_PAGE));
            },
        });

        return {isError, isLoading, data, result, setResult};
    };

    return {queryTableAccounts};
}
