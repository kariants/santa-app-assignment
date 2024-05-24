import React from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../utils/AuthProvider';

export type SantaFormInputs = {
	//username is pulled from user 
	//username: string
	message: string,
}

type SantaFormProps = {
	onSubmit: (data: SantaFormInputs) => void;
}

export const SantaForm = (props: SantaFormProps) => {
	const {user} = useAuth();
	const {
    register,
    handleSubmit,
		control,
    formState: { errors },
  } = useForm<SantaFormInputs>()

  const onSubmit: SubmitHandler<SantaFormInputs> = (data: SantaFormInputs) => {
		props.onSubmit(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Hi {user?.username}!</h1>
			<h1>Write a message to Santa!</h1>
			<label>Message</label>
			<textarea {...register("message", { required: true })} maxLength={1000} />
			{errors.message && <p>Message to Santa is required!</p>}

			<input type="submit" />
		</form>
	);		
}