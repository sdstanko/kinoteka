import React, {FC, useEffect} from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field, ErrorMessage } from 'formik';
import styles from './Auth.module.scss'
import {Link} from 'react-router-dom'
import { IAuthForm } from '../../types/IAuthForm';

interface OtherProps {
	isRegistration: boolean
	isLoading: boolean
	resetAuthError: () => void
}

// Aside: You may see InjectedFormikProps<OtherProps, AuthFormType> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<IAuthForm>) => {
	const { isRegistration, resetAuthError, isLoading } = props;

	return (
		<Form className={styles.form}>
			{isRegistration &&
			<>
				<div className={styles.form__row}>
					<label htmlFor="name" className={styles.label}>
						<span className={styles.form__label}>Name</span>
						<Field 
							type="text" 
							id="name"
							name="name" 
							className={styles.form__input} 
						/>
						<ErrorMessage className={styles.formError} name="name" component="div" />
					</label>
					<label htmlFor="surname" className={styles.label}>
						<span className={styles.form__label}>Surname</span>
						<Field 
							type="text" 
							id="surname"
							name="surname" 
							className={styles.form__input} 
						/>
						<ErrorMessage className={styles.formError} name="surname" component="div" />
					</label>
				</div>
			</>}
			<label htmlFor="email" className={styles.label}>
				<span className={styles.form__label}>Email</span>
				<Field 
					type="text" 
					id="email" 
					name="email"
					className={styles.form__input} 
				/>
				<ErrorMessage className={styles.formError} name="email" component="div" />
			</label>
			<label htmlFor="password" className={styles.label}>
				<span className={styles.form__label}>Password</span>
				<Field 
					type="password" 
					id="password" 
					name="password"
					className={styles.form__input} 
				/>
				<ErrorMessage className={styles.formError} name="password" component="div" />
			</label>
			<button 
				className={styles.form__btn} 
				type="submit"
				disabled={isLoading}
			>
			{isRegistration ? 'Register' : 'Login'}
			</button>
			<div>
			{isRegistration ? 
				<div className={styles.form__row}>
				<span className={styles.form__nav}>
					Have an account? <Link to="/kinoteka/login">Sign In!</Link>
				</span>
				</div>
				:
				<div className={styles.form__row}>
				<span className={styles.form__nav} onClick={() => resetAuthError()}>
					Don't have account? <Link to="/kinoteka/registration">Sign Up!</Link>
				</span>
				</div>
			}
			</div>
		</Form>
	);
};

// The type of props MyForm receives
interface MyFormProps {
	isRegistration: boolean
	isLoading: boolean
	sendData: ({email, password, name, surname}: IAuthForm) => Promise<void>
	resetAuthError: () => void
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, IAuthForm>({
// Transform outer props into form values
	mapPropsToValues: () => {
	return {
		name: '',
		surname: '',
		email: '',
		password: '',
	};
},

// Add a custom validation function (this can be async too!)
	validate: (values: IAuthForm, props) => {
		let errors: FormikErrors<IAuthForm> = {};
		if (props.isRegistration && !values.name) {
			errors.name = 'Required'
		}
		if (props.isRegistration && !values.surname) {
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
			errors.password = 'Password must be at least 8 symbols'
		}
		return errors;
	},

	handleSubmit: (values, props) => {
		props.props.resetAuthError()
		props.props.sendData(values)
		props.setSubmitting(false)
	},
})(InnerForm);


// Use <MyForm /> wherevs
const AuthForm: FC<MyFormProps> = ({isRegistration, sendData, resetAuthError, isLoading}) => (
	<MyForm isRegistration={isRegistration} sendData={sendData} resetAuthError={resetAuthError} isLoading={isLoading}/>
);

export default AuthForm;