import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Context from '../../context/userContext';
import useUser from '../../hooks/useUser';

const loginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required').min(6, 'Invalid password'),
});

const Login = () => {
	const credenciales = {
		email: '',
		password: '',
	};
	const location = useLocation();
	const [error, setError] = useState(null);
	const { isLogged, login } = useUser();
	const { jwt } = useContext(Context);

	useEffect(() => {
		if (isLogged) {
			localStorage.setItem('token', jwt);
		}
	}, [isLogged]);

	const handleSubmit = async values => {
		login(values);
		if (!isLogged) {
			setError('Invalid email or password');
		}
	};

	return !isLogged ? (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row d-flex align-items-center justify-content-center h-100">
					<div className="col-md-8 col-lg-7 col-xl-6">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
							className="img-fluid"
							alt="Phone image"
						/>
					</div>
					<div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
						<Formik
							initialValues={credenciales}
							validationSchema={loginSchema}
							onSubmit={values => handleSubmit(values)}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<Form>
									{error && <p className="text-danger">{error}</p>}

									<div className="form-outline mb-4">
										{/* <label className="form-label" htmlFor="email">
											email
										</label> */}
										<Field
											id="email"
											name="email"
											type="email"
											placeholder="example@email.com"
											className="form-control"
										/>
										{errors.email && touched.email && (
											<div className="error">
												<p>{errors.email}</p>
											</div>
										)}
									</div>

									<div className="form-outline mb-4">
										{/* <label className="form-label" htmlFor="password">
											password
										</label> */}
										<Field
											id="password"
											name="password"
											type="password"
											placeholder="password"
											className="form-control"
										/>
									</div>

									<div className="row mb-4">
										<div className="col d-flex justify-content-center">
											<div className="form-check">
												<input
													className="form-check-input"
													type="checkbox"
													value=""
													id="form2Example31"
													checked
												/>
												<label
													className="form-check-label"
													htmlFor="form2Example31"
												>
													{' '}
													Remember me{' '}
												</label>
											</div>
										</div>
										<div className="col">
											{/* TODO: Forgot password function */}
											<Link to="/login">Forgot password?</Link>
										</div>
									</div>

									{/* <Link to="/home"> */}
									<button
										className="btn btn-primary btn-block mb-4"
										type="submit"
									>
										Login
									</button>
									{/* </Link> */}

									<div className="text-center">
										<p>
											Not a member? <Link to="/register">Register</Link>
										</p>
										<button
											type="button"
											className="btn btn-link btn-floating mx-1"
										>
											<i className="bi bi-facebook"></i>
										</button>

										<button
											type="button"
											className="btn btn-link btn-floating mx-1"
										>
											<i className="bi bi-google"></i>
										</button>

										<button
											type="button"
											className="btn btn-link btn-floating mx-1"
										>
											<i className="bi bi-twitter"></i>
										</button>

										<button
											type="button"
											className="btn btn-link btn-floating mx-1"
										>
											<i className="bi bi-github"></i>
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	) : (
		<Navigate to="/home" replace state={{ from: location }} />
	);
};

export default Login;
