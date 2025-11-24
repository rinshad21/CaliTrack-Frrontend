import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseurl from "@/utils/getBaseurl";

const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseurl()}/api/progress`,
      credentials: "include",
    
    prepareHeaders: (h) => {
      const token = localStorage.getItem("token");
      if (token) h.set("Authorization", `Bearer ${token}`);
      return h;
    },
  }),
  tagTypes: ["Progress"],
  endpoints: (builder) => ({
    getProgress: builder.query({
        query: () => "/",
         providesTags: ["Progress"],
    }),
    updateProgress: builder.mutation({
      query: (data ) => ({
        url: "/update",
        method: "POST",
        body:data,
        }),
         invalidatesTags:["Progress"],
    }),
      deleteProgress: builder.mutation({
       query: (id) => ({
              url:`/delete/${id}`,
           method:"DELETE"
          }),
          invalidatesTags:["Progress"],
      }),
      updatelevel: builder.mutation({
          query: (level) => ({
              url: "/update-level",
              method: "POST",
              body:{level}
          }),
           invalidatesTags:["Progress"],
      })
    }),
  
});

export const { useGetProgressQuery, useUpdateProgressMutation,useDeleteProgressMutation,useUpdatelevelMutation } = progressApi;
export default progressApi;
