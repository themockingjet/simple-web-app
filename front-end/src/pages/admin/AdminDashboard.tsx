//
//
//

import TableReservations from "../../components/withUseQuery/TableReservations";
import TableAccounts from "../../components/withUseQuery/TableAccounts";
import TableUsers from "../../components/withUseQuery/TableUsers";
import Card from "../../components/Card";

import {useQueryReservations} from "../../hooks/useQuery/useQueryReservations";
import CardCounter from "../../components/withUseQuery/CardCounter";

const AdminDashboard = () => {
    //

    return (
        <>
            <div className="grid grid-cols-4 grid-flow-row-dense grid-rows-auto gap-4">
                <div className="lg:h-24 row-span-4 col-span-4 grid grid-rows-4 lg:grid-cols-4 gap-2">
                    {/* Card 1 */}
                    <CardCounter queryString="completed" title="Completed" color="green" />
                    {/* Card 2 */}
                    <CardCounter queryString="pending" title="Pending" color="yellow" />
                    {/* Card 3 */}
                    <CardCounter queryString="confirmed" title="Confirmed" color="slate" />

                    {/* Card 4 */}
                    <CardCounter queryString="cancelled" title="Cancelled" color="red" />
                </div>

                <Card className="p-0 col-span-4 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <TableReservations isEditable={false} />
                </Card>

                <Card className="p-0 col-span-4 lg:col-span-2 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <TableUsers isEditable={false} />
                </Card>

                <Card className="p-0 col-span-4 lg:col-span-2 min-h-[28rem] max-h-[28rem] min-h-[28rem] max-h-[28rem] md:min-h-[32rem] md:max-h-[32rem] flex flex-col overflow-x-auto overflow-y-hidden pb-2">
                    <TableAccounts isEditable={false} />
                </Card>
            </div>
        </>
    );
};

export default AdminDashboard;
