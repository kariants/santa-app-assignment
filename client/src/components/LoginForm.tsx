import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export type LoginFormInputs = {
	username: string
	//password: string
}

type LoginFormProps = {
  handleLogin: (data: LoginFormInputs) => void
}

// It would be best to have login with password, but unfortunately I ran out of time.
export const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    props.handleLogin(data);
	}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>
			<label>Username</label>
			<input {...register("username", { required: true })} />
			{errors.username && <p>Please input your username!</p>}

			{/*
			<label>Password</label>
			<input {...register("password", { required: true })} />
			{errors.username && <p>Please input your password!</p>} 
			*/}

			<br />
			<input type="submit" />
		</form>
  )
}
