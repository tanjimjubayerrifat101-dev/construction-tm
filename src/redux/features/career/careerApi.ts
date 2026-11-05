import { baseApi } from "../../api/baseApi";
import {
  IApplicationListResponse,
  IJobApplicationItem,
  IJobListResponse,
  IJobPositionItem,
} from "./careerTypes";

export const careerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<
      IJobListResponse,
      { page?: number; limit?: number; departmentId?: string; searchTerm?: string; isActive?: string; lang?: string } | void
    >({
      query: (params) => ({
        url: "/careers",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Career"],
    }),

    getJobById: builder.query<{ success: boolean; data: IJobPositionItem }, string>({
      query: (id) => ({
        url: `/careers/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Career"],
    }),

    createJob: builder.mutation<
      { success: boolean; data: IJobPositionItem },
      Partial<IJobPositionItem>
    >({
      query: (body) => ({
        url: "/careers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Career"],
    }),

    updateJob: builder.mutation<
      { success: boolean; data: IJobPositionItem },
      { id: string; data: Partial<IJobPositionItem> }
    >({
      query: ({ id, data }) => ({
        url: `/careers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Career"],
    }),

    deleteJob: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/careers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),

    // Applications
    submitApplication: builder.mutation<
      { success: boolean; data: IJobApplicationItem },
      FormData
    >({
      query: (formData) => ({
        url: "/careers/apply",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),

    getApplications: builder.query<
      IApplicationListResponse,
      { page?: number; limit?: number; jobId?: string; status?: string; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/careers/admin/applications/all",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Application"],
    }),

    updateApplicationStatus: builder.mutation<
      { success: boolean; data: IJobApplicationItem },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/careers/admin/applications/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Application"],
    }),

    deleteApplication: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/careers/admin/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useSubmitApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} = careerApi;
