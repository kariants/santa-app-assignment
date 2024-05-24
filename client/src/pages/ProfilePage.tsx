import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import DatePicker from "react-datepicker";
import { useAuth } from '../utils/AuthProvider';
import "react-datepicker/dist/react-datepicker.css";
import { UserProfile } from '../types/User';

type Inputs = {
	username: string,
  birthday: Date,
	address: string
}

export const ProfilePage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
		control,
    formState: { errors },
  } = useForm<Inputs>()

	const [user, setUser] = useState<UserProfile>();

	useEffect(() => {
		// fetch current user data to show
		// completely WIP, wanted to update current user so user could change their birthday. 

	}, []);

	
  const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log("Profile page update data", data);
    console.log("id", auth?.user?.uid);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>{/*user?.username*/}User's profile todo fetch proper data</h1>
			<h1>Ran out of time, nothing here</h1>
			<label>Username</label>
			<input disabled defaultValue={/*auth.user?.username*/ 'TODO Username'} {...register("username")} />

			<label>Birthday</label>
			<Controller
				control={control}
				name='birthday'
				rules={{ required: true }}
				render={({ field }) => (
					<DatePicker
						showIcon
						dateFormat="yyyy/MM/dd"
						placeholderText='Select birthday'
						onChange={(date) => field.onChange(date)}
						selected={/*user?.birthday*/ null}
						disabled
					/>
				)}
			/>

      <label>Address</label>
			<input disabled defaultValue={/*user?.address*/'TODO test address'} {...register("address")} />
      <br/>
      <button disabled className='submitButton' type="submit">Update Personal Info</button>
		</form>
  );
}
