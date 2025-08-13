import axiosInstance from './axiosInstance';

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const updateUserPassword = async (data: UpdatePasswordData): Promise<string> => {
  const response = await axiosInstance.patch('/user/password', data);
  return response.data;
};
