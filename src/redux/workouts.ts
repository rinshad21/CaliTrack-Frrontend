import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseurl from "@/utils/getBaseurl";
interface Workout {
  _id: string;
  day: number;
  exercises: string[];
  level: string;
}
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseurl()}/api/workouts`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const workoutsapi = createApi({
  reducerPath: "workoutApi",
  baseQuery,
  tagTypes: ["workouts"],
  endpoints: (builder) => ({
    fetchAllWorkouts: builder.query<Workout[], void>({
      query: () => "/",
      transformResponse: (response: any) => response.workouts,
      providesTags: ["workouts"],
    }),
    addWOrkouts: builder.mutation({
      query: (newWorkout) =>({
        url: `/add-workout`,
        method: "POST",
        body:newWorkout,
      }),
      invalidatesTags:["workouts"]
    }),
    deleteWorkouts: builder.mutation({
      query: (id) =>({
        url: `/delete/${id}`,
        method: "DELETE",
    
      }),
      invalidatesTags:["workouts"]
    }),
    updateWorkouts: builder.mutation({
      query: ({ id, data}):any => ({
        url:`/edit/${id}`,
        method: "PUT",
        body:data,
      }),
            invalidatesTags:["workouts"]
    })
  }),
  
});
export const { useFetchAllWorkoutsQuery,useDeleteWorkoutsMutation,useAddWOrkoutsMutation,useUpdateWorkoutsMutation } = workoutsapi;
export default workoutsapi;
