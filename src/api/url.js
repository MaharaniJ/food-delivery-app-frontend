import axios from "axios";
export const baseURL =
  "http://127.0.0.1:5001/food-delivery-app-76f65/us-central1/app";

export const validateJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error response from API:", error.response);
    return null;
  }
};

