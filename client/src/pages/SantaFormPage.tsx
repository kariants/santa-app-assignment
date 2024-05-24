import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';

// components
import { SantaForm, SantaFormInputs } from '../components/SantaForm';
import { useAuth } from '../utils/AuthProvider';
import { Message } from '../types/Message';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../api/services/Message/MessageApi';

export const SantaFormPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // TODO: res: any to type
  const handeMessageSuccess = (res: any) => {
    // These two pages could be combined, or just use toast
    if (res.data.code === 1) {
      navigate('/SuccessPage');
    } else {
      navigate(`/ErrorPage/${res.data.code}`);
    }
  }

  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (res: any) => {
      handeMessageSuccess(res);
    },
    onError: (e: any) => {
      console.log("error: todo handle errors");
    }
  });

  const handleSubmitMessage = async (formData: SantaFormInputs) => {
    const newMessage: Message = {
      userId: user?.uid,
      message: formData.message,
    }

    try {
      await sendMessageMutation(newMessage);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SantaForm onSubmit={handleSubmitMessage} />
  );
}
