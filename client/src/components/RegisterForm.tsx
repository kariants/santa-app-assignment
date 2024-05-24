import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isUsernameTaken } from '../api/services/User/UserApi';
import { UseDebounce } from '../hooks/useDebounce';

export type RegisterFormInputs = {
	username?: string,
	//password?: string,
	address?: string,
	birthdate: Date
}

// TODO: implement proper form validation and error clearing
type RegisterForm = {
  handleRegister: (data: RegisterFormInputs) => void,
}

export const RegisterForm = (props: RegisterForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
		control,
		setError
  } = useForm<RegisterFormInputs>({
		defaultValues: {
			username: undefined,
			//password: undefined,
			address: undefined,
			birthdate: new Date()
		},
	});

	const [inputtedUsername, setInputtedUsername] = useState<string>('');
	const debouncedUsernameCheck = UseDebounce(inputtedUsername);

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data: RegisterFormInputs) => {
    props.handleRegister(data);
	}

	useEffect(() => {
		if (debouncedUsernameCheck !== '') {
			isUsernameTaken(debouncedUsernameCheck).then((usernameTaken: any) => {
					if (usernameTaken === true) {
						setError("username", { type: 'username_taken', message: 'Username is already taken!' }, { shouldFocus: true });
					}
			})
		}
	}, [debouncedUsernameCheck])

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
			<label>Username</label>
			<input {...register("username", { required: true })} onChange={(e: any) => setInputtedUsername(e.target.value)} />
			<p>{ errors.username?.message }</p>


			{/* 
				password not defined in the mock data, should be implemented though
				Should have repeat password with validation that its the same 
				<label>Password</label>
				<input type='password' {...register("password", { required: true })} />
				{errors.password && <p>Please input your password!</p>}
			*/}

			<label>Birthday</label>
			<Controller
				control={control}
				name='birthdate'
				rules={{ required: true }}
				render={({ field }) => (
					<DatePicker
						showIcon
						dateFormat="yyyy/MM/dd"
						placeholderText='Select birthday'
						onChange={(date: Date) => field.onChange(date)}
						selected={field.value}
					/>
				)}
			/>
			{errors.birthdate && <p>Please select your birthday!</p>}

			<label>Address</label>
			<input {...register("address", { required: true })} />
			{errors.username && <p>Please input your address!</p>}

			<br />
			<input type='submit' />
		</form>
  )
}