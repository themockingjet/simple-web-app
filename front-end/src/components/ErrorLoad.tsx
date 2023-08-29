//
//
//

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorLoad = () => {
    return (
        <>
            <div className="flex w-full h-full justify-center items-center drop-shadow text-white font-semibold text-xl">
                <div className="flex space-x-2 justify-center items-center h-12 bg-red-500 rounded-lg px-4 py-2">
                    <FontAwesomeIcon icon={faTimes} />
                    <span>An error occurred.</span>
                </div>
            </div>
        </>
    );
};

export default ErrorLoad;
