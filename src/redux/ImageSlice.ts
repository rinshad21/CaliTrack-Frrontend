import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseurl from "@/utils/getBaseurl";

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseurl()}/api/image`
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData()
        formData.append('my_file', file)
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        }
      },
    }),
    getImage: builder.query({
        query: (publicId) => `/image/${publicId}`,
    })
  }),
})

export const { useUploadImageMutation,useGetImageQuery } = uploadApi