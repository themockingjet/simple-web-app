//
//
//

import TableUserReservations from "../../components/withUseQuery/TableUserReservations";
import Card from "../../components/Card";

const UserDashboard = () => {
    return (
        <>
            <div className="grid w-full grid-cols-4 gap-4">
                <Card className="col-span-4 flex flex-col overflow-x-auto overflow-y-hidden p-0 pb-2 md:max-h-[32rem] md:min-h-[32rem]">
                    <TableUserReservations />
                </Card>
            </div>
        </>
    );
};

export default UserDashboard;
