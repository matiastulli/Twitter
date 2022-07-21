import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const Navbar = () => {
	const { isLogged, logout } = useUser();

	const handleLogout = () => {
		logout();
		localStorage.removeItem('token');
	};

	return (
		// Create a navbar

		<header className="p-3 mb-3 border-bottom">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<Link
						to="/"
						className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Blue_circle_logo.svg/1200px-Blue_circle_logo.svg.png"
							width="35px"
						></img>
						{/* <use xlinkHref="#bootstrap"></use> */}
					</Link>

					<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
						<li>
							<Link to="/home" className="nav-link px-2 link-dark">
								Dev App
							</Link>
						</li>
						{/*
						<li>
							<Link to="#" className="nav-link px-2 link-dark">
								Customers
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-link px-2 link-dark">
								Products
							</Link>
						</li> */}
					</ul>

					<form
						className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
						role="search"
					>
						<input
							type="search"
							className="form-control"
							placeholder="Search..."
							aria-label="Search"
						/>
					</form>

					{isLogged ? (
						<ul className="nav justify-content-center">
							<li>
								<Link to="/notifications" className="nav-link px-2 link-dark">
									<button
										type="button"
										className="btn btn-light position-relative"
									>
										<i className="bi bi-bell" />

										<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
											99
											<span className="visually-hidden">unread messages</span>
										</span>
									</button>
								</Link>
							</li>
						</ul>
					) : null}

					<div className="dropdown text-end p-2">
						<Link
							to="#"
							className="d-block link-dark text-decoration-none dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{isLogged ? (
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo38tCnX_HjKgFyft_g7SeKWrA9IqaS3dgnNJVmwe77ceNSy04aJjtk-ik3xo0VWjXG7Y&usqp=CAU"
									alt="mdo"
									width="32"
									height="32"
									className="rounded-circle"
								/>
							) : (
								<img
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo38tCnX_HjKgFyft_g7SeKWrA9IqaS3dgnNJVmwe77ceNSy04aJjtk-ik3xo0VWjXG7Y&usqp=CAU"
									alt="mdo"
									width="32"
									height="32"
									className="rounded-circle"
								/>
							)}
						</Link>

						{isLogged ? (
							<ul className="dropdown-menu text-small">
								<li>
									<Link
										className="dropdown-item"
										to="/login"
										onClick={handleLogout}
									>
										Logout
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/settings">
										Settings
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/profile">
										Profile
									</Link>
								</li>
								<hr />
								<li>
									<Link className="dropdown-item" to="/about">
										About
									</Link>
								</li>
							</ul>
						) : (
							<ul className="dropdown-menu text-small">
								<li>
									<Link className="dropdown-item" to="/login">
										Login
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="/register">
										Create an account
									</Link>
								</li>
								<hr />
								<li>
									<Link className="dropdown-item" to="/about">
										About
									</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
