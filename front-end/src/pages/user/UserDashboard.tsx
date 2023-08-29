//
//
//

import React from "react";

const UserDashboard = () => {
    return (
        <div className="card lg:ml-2 w-full h-full border border-gray-200 drop-shadow-md">
            <div className="grid grid-flow-row gap-4">
                <div className="container mx-auto">
                    <div className="flex flex-col">
                        <div className="grid grid-flow-row lg:grid-flow-col gap-4 w-full">
                            <div className="flex justify-center items-center h-24 bg-red-500 rounded-xl text-white shadow-lg">
                                <h1>Pending</h1>
                            </div>
                            <div className="flex justify-center items-center h-24 bg-green-500 rounded-xl text-white shadow-lg">
                                <h1>Completed</h1>
                            </div>
                            <div className="flex justify-center items-center h-24 bg-slate-500 rounded-xl text-white shadow-lg">
                                <h1>Cancelled</h1>
                            </div>
                            <div className="flex justify-center items-center h-24 bg-red-100 rounded-xl">
                                <h1>Something...</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Table 1 */}
            </div>
        </div>
    );
};

export default UserDashboard;
