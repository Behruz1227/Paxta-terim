import axios from "axios";
import { config } from "process";
import useDelete from "src/hooks/delete";

// import { config } from "src/hooks/api/token";
import useGet from "src/hooks/get";

const {data, error, get: getUser, isLoading} = useGet()
export const getAllUser = async (setData: any, page: number, size: number) => {
};






