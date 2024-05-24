import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/services/User/UserApi';
import { RegisterForm, RegisterFormInputs } from '../components/RegisterForm'
import { NewUserData } from '../types/User';
import { useAuth } from '../utils/AuthProvider';


export const RegisterUserPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  // TODO: res: any to type
  const handlerRegisterSuccess = (res: any) => {
    if (res.success === false) {
      navigate('/ErrorPage/4');
    } else {
      // new user created, handle auth
      auth.loginAction(res.user);
    }
  }

  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res: any) => {
      handlerRegisterSuccess(res);
    },
    onError: (e: any) => {
      console.log("error: todo handle errors");
    }
  });

  const handleRegister = async (formData: RegisterFormInputs) => {
    const userData: NewUserData = {
      username: formData.username as string,
      address: formData.address as string,
      birthday: formData.birthdate
    }

    try {
      await sendMessageMutation(userData);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="content">
      <h1>Register New User</h1>
      <RegisterForm handleRegister={handleRegister} />
    </div>
  )


}