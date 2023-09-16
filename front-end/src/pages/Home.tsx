//
//
//
import Footer from "../components/Footer";

const home = () => {
	return (
		<>
			<section className="container mx-auto h-auto max-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-7rem)]">
				<div className="flex h-full w-full flex-col">
					<div className="flex h-full w-full flex-col space-y-2 xl:flex-row">
						<div className="w-full flex-col space-y-2">
							<strong className="mx-auto text-center text-2xl text-blue-500 xl:mx-0 xl:px-4 xl:text-left">
								<p>Simple Web Reservation App</p>
							</strong>
							<p className="mx-auto text-center xl:mx-0 xl:text-left">
								It is a simple project idea based on a reservation system for a small renting business.
							</p>
							<p className="mx-auto text-center xl:mx-0 xl:text-left">
								It is made while re-learning{" "}
								<b>
									<u>Express.js</u>
								</b>{" "}
								and exploring{" "}
								<b>
									<u>React.js</u>
								</b>{" "}
								Framework
							</p>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default home;
