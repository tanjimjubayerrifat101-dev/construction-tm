import { baseApi } from "../../api/baseApi";
import { IGenericResponse, ILoginResponse } from "./authTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query<{ success: boolean; data: any }, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    updateMe: builder.mutation<IGenericResponse, FormData | Record<string, any>>({
      query: (body) => ({
        url: "/auth/update-me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation<
      IGenericResponse,
      { oldPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<IGenericResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      IGenericResponse,
      { token: string; newPassword: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
