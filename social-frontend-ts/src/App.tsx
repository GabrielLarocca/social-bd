import { useEffect, useState } from "react";
import { Header } from "./main/components/header/header";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LandingPage } from "./main/pages/landing-page/landing-page";
import { RegisterPage } from "./main/pages/register-page/register-page";
import { MainRoutePage } from "./main/pages/main-route-page/main-route-page";
import { AccountPage } from "./main/pages/account-page/account-page";
import { ToastContainer } from "react-toastify";

export function App() {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) {
			return navigate("/");
		}
	}, [isLogged]);

	if (!isLogged) {
		return (
			<div className="App">
				<Header showPerson={false} />
				<Routes>
					<Route
						path="/register"
						element={<RegisterPage isLogged={isLogged} />}
					/>
					<Route
						path="/"
						element={
							<LandingPage setIsLogged={setIsLogged} isLogged={isLogged} />
						}
					/>
				</Routes>
				<ToastContainer position="bottom-center" theme="colored" />
			</div>
		);
	}

	return (
		<div className="App">
			<Header showPerson={isLogged} />

			<Routes>
				<Route
					path="/register"
					element={<RegisterPage isLogged={isLogged} />}
				/>
				<Route path="/main/*" element={<MainRoutePage />} />
				<Route path="/account" element={<AccountPage />} />
				<Route
					path="/"
					element={
						<LandingPage setIsLogged={setIsLogged} isLogged={isLogged} />
					}
				/>
			</Routes>
			<ToastContainer position="bottom-center" theme="colored" />
		</div>
	);
}
