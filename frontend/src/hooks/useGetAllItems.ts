import { setItemsData } from "@/redux/storeSlice";
import axios from "axios";
import { toast } from "sonner";

export const gettingAllItems = async (dispatch: Function) => {
    try{

        const res = await axios.get(
            "http://localhost:8080/api/v1/store/get-all-items",
            {
                withCredentials: true,
            }
        );
        
        if (res.data.success) {
            dispatch(setItemsData(res.data.items));
        }
        else {
            dispatch(setItemsData(null));
        }

        // const removeNullElements = (data: Array<any>) => {
        //     return data.filter((item) => item !== null);
        // };
    }
    catch(error: any){
        toast.error(error.reponse.data.message);
    }
};