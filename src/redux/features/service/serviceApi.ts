import { baseApi } from "../../api/baseApi";
import { IServiceItem, IServiceListResponse } from "./serviceTypes";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<
      IServiceListResponse,
      { page?: number; limit?: number; searchTerm?: string; isActive?: string; lang?: string } | void
    >({
      query: (params) => ({
        url: "/services",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Service"],
    }),

    getServiceById: builder.query<{ success: boolean; data: IServiceItem }, string>({
      query: (id) => ({
        url: `/services/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    getServiceBySlug: builder.query<
      { success: boolean; data: IServiceItem },
      { slug: string; lang?: string }
    >({
      query: ({ slug, lang }) => ({
        url: `/services/${slug}`,
        method: "GET",
        params: lang ? { lang } : {},
      }),
      providesTags: ["Service"],
    }),

    createService: builder.mutation<{ success: boolean; data: IServiceItem }, FormData | Partial<IServiceItem>>({
      query: (body) => ({
        url: "/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation<
      { success: boolean; data: IServiceItem },
      { id: string; data: FormData | Partial<IServiceItem> }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetServiceBySlugQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
