import { api } from "../api";
import {
  AddTagRequest,
  CreateNoteRequest,
  WriteNoteRequest,
} from "./types/requests";

export const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotes: builder.query<Note[], void>({
      query: () => ({
        url: `/notes`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notes" }],
    }),

    getMyArchived: builder.query<Note[], void>({
      query: () => ({
        url: `/notes/archive`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notes" }],
    }),

    getNoTags: builder.query<Note[], void>({
      query: () => ({
        url: `/notes/noTags`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notes" }],
    }),

    getNote: builder.query<Note[], number>({
      query: (noteId: number) => ({
        url: `/notes/${noteId}`,
        method: "GET",
      }),
    }),

    createNote: builder.mutation<Note, CreateNoteRequest>({
      query: (request: CreateNoteRequest) => ({
        body: request,
        url: `/notes`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Notes" }],
    }),

    writeNote: builder.mutation<Note, WriteNoteRequest>({
      query: (request: WriteNoteRequest) => ({
        body: request,
        url: `/notes/${request.noteId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Notes" }],
    }),

    addTag: builder.mutation<void, AddTagRequest>({
      query: (request: AddTagRequest) => ({
        body: request,
        url: `/notes/${request.noteId}/tagging/${request.tagId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Notes" }],
    }),

    moveToArchive: builder.mutation<void, number>({
      query: (noteId: number) => ({
        url: `/notes/archive/${noteId}`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "Notes" }],
    }),

    deleteNote: builder.mutation<void, number>({
      query: (noteId: number) => ({
        url: `/notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Notes" }],
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useWriteNoteMutation,
  useDeleteNoteMutation,
  useAddTagMutation,
  useMoveToArchiveMutation,
  useGetNoteQuery,
  useLazyGetMyArchivedQuery,
  useLazyGetMyNotesQuery,
  useLazyGetNoTagsQuery
} = notesApi;
