
import axios from "axios";
import { config } from "src/hooks/api/token";
import { allUserGet } from "src/hooks/api/url";

// all user get 
export const getAllUser = async (setData: any) => {
  try {
    const response = await axios.get(`${allUserGet}`, config);
    if (response.data.body) {
      setData(response.data.body);
    } else {
      console.log("Error from backend:", response.data.error); 
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    setData([]);
  }
}; 


