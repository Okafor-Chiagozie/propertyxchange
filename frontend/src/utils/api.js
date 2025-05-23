import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"


export const api = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: "https://propertyxchange-api-ten.vercel.app/api",
    withCredentials: true,
})

export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd", {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data.reverse()
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}


export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}

export const createUser = async (email, token) => {
  try {
      console.log("📩 Sending email:", email); // Debug log

      const response = await api.post(
          `/user/register`,
          { email }, // Sending data
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
          }
      );

      console.log("Server response:", response.data); // Log success response
      return response.data;
  } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      toast.error("Something went wrong, Please try again.");
      throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            id: propertyId,
            date: dayjs(date).format("DD/MM/YYYY"),
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    } catch (error) {
        toast.error("Something went wrong, Try again please")
        throw error
    }
}

export const removeBooking = async (id, email, token) => {
    try {
        await api.post(`/user/removeBooking/${id}`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong, Try again please")
        throw error
    }
}


export const toFav = async (id, email, token) => {
    try {
        await api.post(`/user/toFav/${id}`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (e) {
        throw e
    }
}


export const getAllFav = async (email, token) => {
    if (!token) return
    try {
        const res = await api.post(`/user/allFav`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return res.data["favResidenciesID"]
    } catch (e) {
        toast.error("Something went wrong while fetching your fav list")
        throw e
    }
}

export const getAllBookings = async (email, token) => {
    if (!token) return
    try {
        const res = await api.post(`/user/allBookings`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return res.data["bookedVisits"]
    } catch (e) {
        toast.error("Something went wrong while fetching your booking list")
        throw e
    }
}

export const createResidency = async (data, token, userEmail) => {
    // Ensure userEmail is included in the data object
    const requestData = { ...data, userEmail };
    console.log(requestData) // Load the updated data object

    try {
        const res = await api.post(`/residency/create`,
            requestData, // Pass the updated data object as the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

    } catch (e) {

        throw e
    }
}