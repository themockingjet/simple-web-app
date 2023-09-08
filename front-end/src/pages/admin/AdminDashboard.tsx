//
//
//

import TableReservations from "../../components/withUseQuery/TableReservations";
import TableAccounts from "../../components/withUseQuery/TableAccounts";
import TableUsers from "../../components/withUseQuery/TableUsers";
import Card from "../../components/Card";

import CardCounter from "../../components/withUseQuery/CardCounter";

const AdminDashboard = () => {
    //

    return (
        <>
            <div className="grid w-full grid-cols-4 gap-4">
                <div className="col-span-4 row-span-4 grid grid-rows-4 gap-2 lg:h-24 lg:grid-cols-4">
                    {/* Card 1 */}
                    <CardCounter queryString="completed" title="Completed" color="green" />
                    {/* Card 2 */}
                    <CardCounter queryString="pending" title="Pending" color="amber" />
                    {/* Card 3 */}
                    <CardCounter queryString="confirmed" title="Confirmed" color="slate" />

                    {/* Card 4 */}
                    <CardCounter queryString="cancelled" title="Cancelled" color="red" />
                </div>

                <Card className="col-span-4 flex flex-col overflow-x-auto overflow-y-hidden p-0 pb-2 md:max-h-[32rem] md:min-h-[32rem]">
                    <TableReservations isEditable={false} />
                </Card>

                <Card className="col-span-4 flex flex-col overflow-x-auto overflow-y-hidden p-0 pb-2 md:max-h-[32rem] md:min-h-[32rem] lg:col-span-2">
                    <TableUsers isEditable={false} />
                </Card>

                <Card className="col-span-4 flex flex-col overflow-x-auto overflow-y-hidden p-0 pb-2 md:max-h-[32rem] md:min-h-[32rem] lg:col-span-2">
                    <TableAccounts isEditable={false} />
                </Card>
            </div>
        </>
    );
};

export default AdminDashboard;
