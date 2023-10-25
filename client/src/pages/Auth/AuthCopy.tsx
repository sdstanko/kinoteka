import React, {FC} from 'react';
import {Formik, withFormik, FormikProps, FormikErrors, Form, Field, ErrorMessage, useFormik } from 'formik';
import styles from './Auth.module.scss'
import {Link, useLocation} from 'react-router-dom'

interface AuthCopyProps {
	isRegistration: boolean
}

interface AuthFormType {
	name: string, 
	surname: string, 
	email: string, 
	password: string
}

const validate = (values: AuthFormType) => {
		let errors: FormikErrors<AuthFormType> = {};
		if (!values.name) {
			errors.name = 'Required'
		}
		if (!values.surname) {
			errors.surname = 'Required'
		}
		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}
		if (!values.password) {
			errors.password = 'Required'
		} else if (values.password.length < 8) {
			errors.password = 'Password must be > 8 symbols'
		}
		return errors;
	}

// Aside: You may see InjectedFormikProps<OtherProps, AuthFormType> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const AuthCopy: FC<AuthCopyProps> = ({isRegistration}) => {


	const formik = useFormik({
     initialValues: { name: '', surname: '', email: '', password: ''} ,
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   	});


	return (
	// 	<Formik
    //    initialValues={{ name: '', surname: '', email: '', password: ''}}
	// 	validate
    //    onSubmit={(values) => {
    //        alert(JSON.stringify(values, null, 2));
    //    }}
    //  >
		<form onSubmit={formik.handleSubmit} className={styles.form}>
			{isRegistration &&
			<>
				<div className={styles.form__row}>
					<label htmlFor="name" className={styles.label}>
						<span className={styles.form__label}>Name</span>
						<input 
							type="text" 
							id="name"
							name="name" 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
         					value={formik.values.name}
							className={styles.form__input} 
						/>
						{formik.touched.name && formik.errors.name ? 
							<div className={styles.error}>{formik.errors.name}</div> : null}
					</label>
					<label htmlFor="surname" className={styles.label}>
						<span className={styles.form__label}>Surname</span>
						<input 
							type="text" 
							id="surname"
							name="surname" 
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
        					value={formik.values.surname}
							className={styles.form__input} 
						/>
						{formik.touched.surname && formik.errors.surname ? 
							<div className={styles.error}>{formik.errors.surname}</div> : null}
					</label>
				</div>
			</>}
			<label htmlFor="email" className={styles.label}>
				<span className={styles.form__label}>Email</span>
				<input 
					type="text" 
					id="email" 
					name="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
        			value={formik.values.email}
					className={styles.form__input} 
				/>
				{formik.touched.email && formik.errors.email ? 
					<div className={styles.error}>{formik.errors.email}</div> : null}
			</label>
			<label htmlFor="password" className={styles.label}>
				<span className={styles.form__label}>Password</span>
				<input 
					type="password" 
					id="password" 
					name="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
         			value={formik.values.password}
					className={styles.form__input} 
				/>
				{formik.touched.password && formik.errors.password ? 
					<div className={styles.error}>{formik.errors.password}</div> : null}
			</label>
			<button 
				className={styles.form__btn} 
				// onClick={click} 
				type="submit"
			>
			{isRegistration ? 'Register' : 'Login'}
			</button>
			<div>
			{isRegistration ? 
				<div className={styles.form__row}>
				<span className={styles.form__nav}>
					Have an account? <Link to="/login">Sign In!</Link>
				</span>
				</div>
				:
				<div className={styles.form__row}>
				<span className={styles.form__nav}>
					Don't have account? <Link to="/registration">Sign Up!</Link>
				</span>
				</div>
			}
			</div>
		</form>
		// </Formik>
	);
};



export default AuthCopy;