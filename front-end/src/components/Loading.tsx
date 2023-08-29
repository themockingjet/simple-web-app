//
//
//

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
    return (
        <>
            <div className="flex w-full h-full justify-center items-center drop-shadow text-white font-semibold text-xl">
                <div className="flex space-x-2 justify-center items-center h-12 bg-blue-500 rounded-lg px-4 py-2">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span className="italic">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Loading;
