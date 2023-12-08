import { api } from "../api";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyTasks: builder.query<Task[], void>({
      query: () => ({
        url: `/tasks`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Tasks" }],
    }),

    getMyCompleted: builder.query<Task[], void>({
      query: () => ({
        url: `/tasks/completed`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Tasks" }],
    }),

    createTask: builder.mutation<void, TaskRequest>({
      query: (request: TaskRequest) => ({
        body: request,
        url: `/tasks`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Tasks" }],
    }),

    updateTask: builder.mutation<void, TaskRequest>({
      query: (request: TaskRequest) => ({
        body: request,
        url: `/tasks/${request.id}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Tasks" }],
    }),

    deleteTask: builder.mutation<void, number>({
      query: (taskId: number) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Tasks" }],
    }),
  }),
});

export const {
  useLazyGetMyCompletedQuery,
  useLazyGetMyTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation
} = tasksApi;
