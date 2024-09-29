import "./login.css";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@mui/material";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { user, isFetching, err, dispatch } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await loginCall(
			{
				email: emailRef.current.value,
				password: passwordRef.current.value,
			},
			dispatch
		);
	};

	console.log(user);
	console.log(err);

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Lamasocial</h3>
					<span className="loginDesc">
						Connect with friends and the world around you on
						Lamasocial.
					</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							required
							className="loginInput"
							ref={emailRef}
						/>
						<input
							type="password"
							required
							minLength="6"
							placeholder="Password"
							className="loginInput"
							ref={passwordRef}
						/>
						<button className="loginButton" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress color="warning" size="20px" />
							) : (
								"Login"
							)}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<button className="loginRegisterButton">
							{isFetching ? (
								<CircularProgress color="warning" size="20px" />
							) : (
								"Create A New Account"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
