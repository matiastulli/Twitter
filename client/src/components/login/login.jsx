import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types';

const loginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required').min(6, 'Invalid password'),
});

const Login = ({ login }) => {
	const credenciales = {
		email: '',
		password: '',
	};

	return (
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
							onSubmit={values => login(values.email, values.password)}
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
										{errors.password && touched.password && (
											<div className="error">
												<p>{errors.password}</p>
											</div>
										)}
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
											<a href="#!">Forgot password?</a>
										</div>
									</div>

									<button
										className="btn btn-primary btn-block mb-4"
										type="submit"
									>
										Login
									</button>

									<div className="text-center">
										<p>
											Not a member? <a href="#!">Register</a>
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
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default Login;
