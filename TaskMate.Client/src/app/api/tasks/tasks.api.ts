
import { api } from "../api";
import { Task } from "./types/task";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyTasks: builder.query<Task[], void>({
      query: () => ({
        url: `/tasks`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Tasks", id: "Все" }],
    }),

    getMyCompleted: builder.query<Task[], void>({
      query: () => ({
        url: `/tasks/completed`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Tasks", id: "Выполненные" }],
    }),

    getUrgents: builder.query<Task[], void>({
      query: () => ({
        url: `/tasks/urgent`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Tasks", id: "Срочные" }],
    }),

    searchTasks: builder.query<Task[], {search: string, isCompleted: boolean}>({
      query: (request: {search: string, isCompleted: boolean}) => ({
        url: `/tasks/search?searchStr=${request.search}&isCompleted=${request.isCompleted}`,
        method: "GET",
      }),
    }),

    getTask: builder.query<Task, number>({
      query: (taskId: number) => ({
        url: `/tasks/${taskId}`,
        method: "GET",
      }),
    }),

    createTask: builder.mutation<void, TaskRequest>({
      query: (request: TaskRequest) => ({
        body: request,
        url: `/tasks`,
        method: "POST",
      }),
    }),

    updateTask: builder.mutation<void, TaskRequest>({
      query: (request: TaskRequest) => ({
        body: request,
        url: `/tasks/${request.id}`,
        method: "PUT",
      }),
    }),

    completeTask: builder.mutation<void, number>({
      query: (taskId: number) => ({
        url: `/tasks/complete/${taskId}`,
        method: "PUT",
      }),
    }),

    deleteTask: builder.mutation<void, number>({
      query: (taskId: number) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetMyCompletedQuery,
  useLazyGetMyTasksQuery,
  useLazyGetUrgentsQuery,
  useLazyGetTaskQuery,
  useGetTaskQuery,
  useLazySearchTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useUpdateTaskMutation
} = tasksApi;
