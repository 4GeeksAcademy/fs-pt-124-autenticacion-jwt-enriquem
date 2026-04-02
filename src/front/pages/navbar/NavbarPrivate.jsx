import { useNavigate } from "react-router-dom";

export const NavbarPrivate = () => {

	const navigate = useNavigate()

	const handleLogout = (e) => {
		e.preventDefault()
		
        localStorage.removeItem("user_token");

        navigate("/")

    }

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="/private/home">Home</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
						<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link" onClick={(e)=>handleLogout(e)}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};