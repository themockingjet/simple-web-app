//
//
//

import axios from "../api/axios";
import FormRegister from "../components/Forms/FormRegister";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Card from "../components/Card";

const Register = () => {
	const methods = useForm({ mode: "onChange" });
	const [serverResponse, setServerResponse] = useState({ status: "", message: "" });

	const onSubmit = methods.handleSubmit((data) => {
		try {
			axios
				.post("/api/register", JSON.stringify(data), {
					headers: { "Content-Type": "application/json", withCredentials: true },
				})
				.then((response) => {
					if (response.status === 200) {
						methods.reset();
						setServerResponse({ status: "success", message: response.data.message });
					}
				});
		} catch (error: any) {
			if (!error.response) {
				setServerResponse({ status: "error", message: "No Server Response" });
			} else if (error.response.status === 409) {
				setServerResponse({ status: "error", message: error.response.data.message });
			} else {
				setServerResponse({ status: "error", message: "Registration failed" });
			}
		}

		setTimeout(() => {
			setServerResponse({ status: "", message: "" });
		}, 3000);
	});

	const handleClick = () => {
		if (serverResponse.status) {
			setServerResponse({ status: "", message: "" });
		} else {
			setServerResponse({ status: "success", message: "aisdjoaisjdoaisjdoa" });
		}
	};

	return (
		<div className="flex h-full xl:h-screen items-center justify-center w-full">
			<Card className="lg:max-w-lg w-full border border-slate-200">
				<h1 className="text-center font-bold text-blue-500 text-xl py-4">Register</h1>
				<FormProvider {...methods}>
					<FormRegister onSubmit={onSubmit} />
				</FormProvider>
			</Card>

			{serverResponse.status && (
				<div className="fixed top-0 inset-x-0 m-1 ">
					<div
						className={`w-full h-full p-2 rounded-lg font-medium bg-opacity-75 border  ${
							serverResponse.status === "success"
								? "bg-green-300 border-green-800"
								: "bg-red-300 border-red-800"
						}`}
					>
						<p
							className={`text-center font-semibold ${
								serverResponse.status === "success" ? "text-green-500" : "text-red-500"
							}`}
						>
							asdasd
							{serverResponse.message}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Register;
