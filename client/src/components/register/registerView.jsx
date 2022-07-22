import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import signinLogo from './singin.svg';

const registerSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	surname: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required').min(6, 'Invalid password'),
	confirmPassword: Yup.string()
		.required('Required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	birthDate: Yup.date('Invalid date'),
});

// eslint-disable-next-line react/prop-types
const Register = ({ register }) => {
	const credenciales = {
		name: '',
		surname: '',
		email: '',
		password: '',
		confirmPassword: '',
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
							validationSchema={registerSchema}
							onSubmit={values =>
								register(
									values.name,
									values.surname,
									values.email,
									values.password
								)
							}
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
										<Field
											id="name"
											name="name"
											type="text"
											placeholder="Your name"
											className="form-control"
											style={{
												borderColor:
													touched.name && errors.name ? 'red' : '#ced4da',
											}}
										/>
									</div>

									<div className="form-outline mb-4">
										<Field
											id="surname"
											name="surname"
											type="text"
											placeholder="Your surname"
											className="form-control"
											style={{
												borderColor:
													touched.surname && errors.surname ? 'red' : '#ced4da',
											}}
										/>
									</div>

									<div className="form-outline mb-4">
										<Field
											id="email"
											name="email"
											type="email"
											placeholder="example@email.com"
											className="form-control"
											style={{
												borderColor:
													touched.email && errors.email ? 'red' : '#ced4da',
											}}
										/>
									</div>

									<div className="form-outline mb-4">
										<Field
											id="password"
											name="password"
											type="password"
											placeholder="password"
											className="form-control"
											style={{
												borderColor:
													touched.password && errors.password
														? 'red'
														: '#ced4da',
											}}
										/>
									</div>

									<div className="form-outline mb-4">
										<Field
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											placeholder="confirm password"
											className="form-control"
											style={{
												borderColor:
													touched.confirmPassword && errors.confirmPassword
														? 'red'
														: '#ced4da',
											}}
										/>
									</div>

									{errors.confirmPassword && touched.confirmPassword && (
										<div className="error">
											<p>{errors.confirmPassword}</p>
										</div>
									)}

									<button
										className="btn btn-primary btn-block mb-4"
										type="submit"
										disabled={isSubmitting}
									>
										Create account
									</button>

									<div className="text-center">
										<p>
											Already a member? <Link to="/login">Login</Link>
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

Register.propTypes = {
	register: PropTypes.func.isRequired,
};

export default Register;
