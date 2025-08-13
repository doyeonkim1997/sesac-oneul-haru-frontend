import axiosInstance from './axiosInstance';

export interface UpdateProfileData {
  nickName?: string;
  file?: File;
}

export const updateUserProfile = async (data: UpdateProfileData): Promise<string> => {
  // 닉네임만 수정하는 경우와 파일도 함께 업로드하는 경우를 구분
  if (data.file) {
    // 파일과 닉네임을 함께 업로드
    const formData = new FormData();

    if (data.nickName) {
      formData.append('nickName', data.nickName);
    }

    formData.append('file', data.file);

    const response = await axiosInstance.patch('/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } else {
    // 닉네임만 수정하는 경우 - JSON으로 전송
    const response = await axiosInstance.patch(
      '/user/profile',
      {
        nickName: data.nickName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
};
