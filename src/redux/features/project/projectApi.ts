import { baseApi } from "../../api/baseApi";
import { IProjectItem, IProjectListResponse } from "./projectTypes";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<
      IProjectListResponse,
      {
        page?: number;
        limit?: number;
        sectorSlug?: string;
        statusCode?: string;
        regionId?: string;
        searchTerm?: string;
        isActive?: string;
        lang?: string;
      } | void
    >({
      query: (params) => ({
        url: "/projects",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Project"],
    }),

    getProjectById: builder.query<{ success: boolean; data: IProjectItem }, string>({
      query: (id) => ({
        url: `/projects/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    getPresenceMapData: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => ({
        url: "/projects/presence-map",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    createProject: builder.mutation<
      { success: boolean; data: IProjectItem },
      FormData | Partial<IProjectItem>
    >({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation<
      { success: boolean; data: IProjectItem },
      { id: string; data: FormData | Partial<IProjectItem> }
    >({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetPresenceMapDataQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
