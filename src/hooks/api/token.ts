const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5OTg5MDEyMzQ1NjciLCJpYXQiOjE3Mjg1MzE4NjEsImV4cCI6MTcyODYxODI2MX0.hjSv2SQrQSv6OGPSuOqV2j8h2EFm8mUzSickbNtDx7P9eJTOR5Vq7jx2HxZrgyExCdCnN4V3l5Hm0j-7872o_Q`;

sessionStorage.setItem('token', token);

export const config = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
};

export const setConfig = () => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
};
