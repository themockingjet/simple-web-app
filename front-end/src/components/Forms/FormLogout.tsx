//
//
//

interface FormLogoutInterface {
    onSubmit: (e: any) => void;
}

const FormLogout = ({ onSubmit }: FormLogoutInterface) => {
    return (
        <form className="w-full text-start font-bold text-base hover:text-blue-300" onSubmit={onSubmit}>
            <input type="submit" value="Logout" />
        </form>
    );
};

export default FormLogout;
