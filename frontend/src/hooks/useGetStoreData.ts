import { setStoreData } from "@/redux/storeSlice";
import axios from "axios";
import { toast } from "sonner";

export const gettingStoreData = async (dispatch: Function) => {

    try {
        const res = await axios.get(
            "http://localhost:8080/api/v1/store/get-store-data",
            {
                withCredentials: true,
            }
        );

        if (res.data.success) {
            dispatch(setStoreData(res.data.storeData));
        }
    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
};