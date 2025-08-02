import axiosInstance from './axiosInstance';

export const withdrawUser = async (password?: string): Promise<string> => {
  if (password) {
    // 이메일 로그인 사용자 - 비밀번호 검증 필요
    const response = await axiosInstance.delete('/user/delete/with-password', {
      data: { password },
    });
    return response.data;
  } else {
    // 소셜 로그인 사용자 - 비밀번호 검증 없음
    const response = await axiosInstance.delete('/user/delete');
    return response.data;
  }
};
