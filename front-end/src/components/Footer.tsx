//
//
//

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="container sticky bottom-0 mx-auto h-12 border-t-2 border-blue-500 drop-shadow-md lg:h-14">
            <div className="flex h-full flex-row items-center justify-between px-4">
                <div className="flex space-x-2">
                    <FontAwesomeIcon icon={faLinkedin} color="blue" size="lg" />
                    <FontAwesomeIcon icon={faFacebook} color="blue" size="lg" />
                </div>
                <div>Stack</div>
                <div>Libary</div>
            </div>
        </footer>
    );
};

export default Footer;
