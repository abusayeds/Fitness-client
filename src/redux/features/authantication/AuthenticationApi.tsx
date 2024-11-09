import { baseApi } from "../../api/baseApi";

const authenticationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "auth/signup",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    allUser: builder.query({
      query: () => {
        return {
          url: "auth/all-user",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `auth/delete-user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useAllUserQuery,
  useDeleteUserMutation,
} = authenticationApi;
