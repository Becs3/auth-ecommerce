import axios from "axios";
import { User } from "../models/user"
import { API_URL } from "./baseService";

export type tokenResponsType = {
    user: User,
    expires_in: number,
    token: string
}

export const signInToken = async() => {
    try{
        axios.defaults.withCredentials = true;
        const respons = await axios.post(API_URL + "/auth/login", {
            username:"Admin",
            password: "123"
        });

        return respons.data
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export const refreshToken = async() => {
    try {
        axios.defaults.withCredentials = true;
        const respons = await axios.post(API_URL+ "/auth/refresh-token");

        return respons.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const clearTokens = async() => {
    try {
        axios.defaults.withCredentials = true;
        await axios.post(API_URL+"/auth/clear-token")
    } catch (error) {
        console.log(error);
        throw error;
    }
}