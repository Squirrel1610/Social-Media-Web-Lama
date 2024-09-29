import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Register() {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordAgainRef = useRef();
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(passwordRef.current.value, passwordAgainRef.current.value);
		if (passwordRef.current.value !== passwordAgainRef.current.value) {
			passwordAgainRef.current.setCustomValidity(
				"Passwords don't match!"
			);
		} else {
			const user = {
				username: usernameRef.current.value,
				email: emailRef.current.value,
				password: passwordRef.current.value,
			};
			try {
				await axios.post("/auth/register", user);
				history.push("/login");
			} catch (err) {
				console.log(err);
			}
		}
	};

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
							placeholder="Username"
							className="loginInput"
							required
							ref={usernameRef}
						/>
						<input
							placeholder="Email"
							className="loginInput"
							type="email"
							required
							ref={emailRef}
						/>
						<input
							type="password"
							placeholder="Password"
							className="loginInput"
							required
							minLength="6"
							ref={passwordRef}
						/>
						<input
							type="password"
							placeholder="Password Again"
							className="loginInput"
							required
							minLength="6"
							ref={passwordAgainRef}
						/>
						<button className="loginButton" type="submit">
							Sign Up
						</button>
						<button className="loginRegisterButton">
							Log into Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
