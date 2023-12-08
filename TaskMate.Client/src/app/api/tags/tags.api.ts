import { api } from "../api";


export const tagsApi = api.injectEndpoints({
    endpoints: (builder) => ({
      getTags: builder.query<Tag[], void>({
        query: () => ({
          url: `/tags`,
          method: "GET",
        }),
        providesTags: () => [{ type: "Tags" }],
      }),
  
      createTag: builder.mutation<Tag, CreateTagRequest>({
        query: (request: CreateTagRequest) => ({
          body: request,
          url: `/tags`,
          method: "POST",
        }),
        invalidatesTags: () => [{ type: "Tags" }],
      }),
  
      deleteTag: builder.mutation<void, number>({
        query: (tagId: number) => ({
          url: `/tags/${tagId}`,
          method: "DELETE",
        }),
        invalidatesTags: () => [{ type: "Tags" }],
      }),
    }),
  });

  export const selectAllTags = tagsApi.endpoints.getTags.select();
  
  export const {
    useCreateTagMutation,
    useDeleteTagMutation,
    useGetTagsQuery
  } = tagsApi;