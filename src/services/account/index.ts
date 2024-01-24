import { API_URL, API_HOST_HEADER, saveAuthData, getAuthHeader, removeAuthData } from './../config';
import { jwtDecode } from 'jwt-decode';

const USER_API_URL = `${API_URL}/account/users`;

export type UserModel = {
  userId: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type UserAuthResultModel = Omit<UserModel, 'password'> & {
  token: string;
};

export const all = async (): Promise<UserModel[]> => {
  const fn = new Promise<UserModel[]>((resolve, reject) => {
    fetch(USER_API_URL, {
      method: 'GET',
      headers: {
        'Host': API_HOST_HEADER,
        'Authorization': getAuthHeader() as string,
      },
      redirect: 'follow',
    })
      .then(res => res.text())
      .then(data => resolve(JSON.parse(data)))
      .catch(error => reject(error));
  });

  return fn;
};

export const signin = async (username: string, password: string): Promise<UserAuthResultModel> => {
  const fn = new Promise<UserAuthResultModel>((resolve, reject) => {
    fetch(`${USER_API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Host': API_HOST_HEADER,
      },
      redirect: 'follow',
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        const dataParsed = JSON.parse(data);
        const userPayload = jwtDecode(dataParsed.token) as UserModel;
        const result = { ...dataParsed, ...userPayload };
        saveAuthData(result);
        resolve(result);
      })
      .catch((error) => reject(error));
  });

  return fn;
}

export const signup = async (user: Omit<UserModel, 'userId' | 'createdAt' | 'updatedAt'>): Promise<UserAuthResultModel> => {
  const fn = new Promise<UserAuthResultModel>((resolve, reject) => {
    fetch(USER_API_URL, {
      method: 'POST',
      headers: {
        'Host': API_HOST_HEADER,
      },
      redirect: 'follow',
      body: JSON.stringify(user),
    })
      .then((res) => res.text())
      .then((data) => {
        const dataParsed = JSON.parse(data);
        const userPayload = jwtDecode(dataParsed.token) as UserModel;
        const result = { ...dataParsed, ...userPayload };
        saveAuthData(result);
        resolve(result);
      })
      .catch((error) => reject(error));
  });

  return fn;
}

export const signout = async (): Promise<void> => {
  const fn = new Promise<void>((resolve) => {
    removeAuthData();
    resolve();
  });

  return fn;
};
