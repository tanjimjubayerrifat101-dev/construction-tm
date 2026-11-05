import { baseApi } from "../../api/baseApi";
import { IMediaListResponse, IMediaPostItem } from "./mediaTypes";

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMediaPosts: builder.query<
      IMediaListResponse,
      { page?: number; limit?: number; category?: string; searchTerm?: string; isPublished?: string; lang?: string } | void
    >({
      query: (params) => ({
        url: "/media",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Media"],
    }),

    getMediaById: builder.query<{ success: boolean; data: IMediaPostItem }, string>({
      query: (id) => ({
        url: `/media/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Media"],
    }),

    createMediaPost: builder.mutation<
      { success: boolean; data: IMediaPostItem },
      FormData | Partial<IMediaPostItem>
    >({
      query: (body) => ({
        url: "/media",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Media"],
    }),

    updateMediaPost: builder.mutation<
      { success: boolean; data: IMediaPostItem },
      { id: string; data: FormData | Partial<IMediaPostItem> }
    >({
      query: ({ id, data }) => ({
        url: `/media/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),

    deleteMediaPost: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const {
  useGetMediaPostsQuery,
  useLazyGetMediaPostsQuery,
  useGetMediaByIdQuery,
  useCreateMediaPostMutation,
  useUpdateMediaPostMutation,
  useDeleteMediaPostMutation,
} = mediaApi;
