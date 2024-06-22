import { api } from "../api";
import {
  AddTagRequest,
  CreateNoteRequest,
  LoadCoverRequest,
  WriteNoteRequest,
} from "./types/requests";

export const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotes: builder.query<Note[], void>({
      query: () => ({
        url: `/notes`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notes", id: "Личные" }],
    }),

    getMyArchived: builder.query<Note[], void>({
      query: () => ({
        url: `/notes/archive`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notes", id: "Архив" }],
    }),

    getNoTags: builder.query<Note[], void>({
      query: () => ({
        url: `/notes/noTags`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Notes", id: "Без тегов" }],
    }),

    searchNotes: builder.query<Note[], { search: string; isArchive: boolean }>({
      query: (request: { search: string; isArchive: boolean }) => ({
        url: `/notes/search?searchStr=${request.search}&isArchive=${request.isArchive}`,
        method: "GET",
      }),
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
    }),

    writeNote: builder.mutation<Note, WriteNoteRequest>({
      query: (request: WriteNoteRequest) => ({
        body: request,
        url: `/notes/${request.noteId}`,
        method: "PUT",
      }),
    }),

    addTag: builder.mutation<void, AddTagRequest>({
      query: (request: AddTagRequest) => ({
        body: request,
        url: `/notes/${request.noteId}/tagging/${request.tagId}`,
        method: "PUT",
      }),
    }),

    moveToArchive: builder.mutation<void, number>({
      query: (noteId: number) => ({
        url: `/notes/archive/${noteId}`,
        method: "PUT",
      }),
    }),

    setCover: builder.mutation<void, LoadCoverRequest>({
      query: (request: LoadCoverRequest) => ({
        body: request.formData,
        prepareHeaders: (headers: Headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
        url: `/notes/newCover/${request.noteId}`,
        method: "PUT",
      }),
    }),

    removeCover: builder.mutation<void, number>({
      query: (noteId: number) => ({
        url: `/notes/removeCover/${noteId}`,
        method: "PUT",
      }),
    }),

    deleteNote: builder.mutation<void, number>({
      query: (noteId: number) => ({
        url: `/notes/${noteId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useWriteNoteMutation,
  useDeleteNoteMutation,
  useAddTagMutation,
  useMoveToArchiveMutation,
  useSetCoverMutation,
  useRemoveCoverMutation,
  useGetNoteQuery,
  useLazyGetMyArchivedQuery,
  useLazyGetMyNotesQuery,
  useLazyGetNoTagsQuery,
  useLazySearchNotesQuery,
} = notesApi;
