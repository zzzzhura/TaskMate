import { createSlice } from "@reduxjs/toolkit";
import { notesApi } from "../api/notes/notes.api";
import { tasksApi } from "../api/tasks/tasks.api";
import { Task } from "../api/tasks/types/task";

export interface MainState {
  currentNote: Note | null;
  currentTask: Task | null;
  notesList: Note[] | null;
  taskList: Task[] | null;
  fullNotes: Note[] | null;
  fullTasks: Task[] | null;
  sectionName:
    | "Личные"
    | "Без тегов"
    | "Архив"
    | "Все"
    | "Срочные"
    | "Выполненные"
    | null;
}

const initialState: MainState = {
  currentNote: null,
  currentTask: null,
  notesList: null,
  taskList: null,
  sectionName: null,
  fullNotes: null,
  fullTasks: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
      state.currentTask = null;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
      state.currentNote = null;
    },
    setSection: (state, action) => {
      state.sectionName = action.payload;
    },
    setNotesList: (state, action) => {
      state.notesList = action.payload;
    },
    setTasksList: (state, action) => {
      state.taskList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      notesApi.endpoints.getMyNotes.matchFulfilled,
      (state, { payload }) => {
        state.notesList = payload;
        state.fullNotes = payload;
        state.fullTasks = null;
        state.taskList = null;
      }
    );

    builder.addMatcher(
      notesApi.endpoints.getMyArchived.matchFulfilled,
      (state, { payload }) => {
        state.notesList = payload;
        state.fullNotes = payload;
        state.fullTasks = null;
        state.taskList = null;
      }
    );

    builder.addMatcher(
      notesApi.endpoints.getNoTags.matchFulfilled,
      (state, { payload }) => {
        state.notesList = payload;
        state.fullNotes = payload;
        state.fullTasks = null;
        state.taskList = null;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getMyTasks.matchFulfilled,
      (state, { payload }) => {
        state.taskList = payload;
        state.fullTasks = payload;
        state.fullNotes = null;
        state.notesList = null;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getMyCompleted.matchFulfilled,
      (state, { payload }) => {
        state.taskList = payload;
        state.fullTasks = payload;
        state.fullNotes = null;
        state.notesList = null;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getUrgents.matchFulfilled,
      (state, { payload }) => {
        state.taskList = payload;
        state.notesList = null;
        state.fullTasks = payload;
        state.fullNotes = null;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getTask.matchFulfilled,
      (state, { payload }) => {
        state.currentTask = payload;
      }
    );
  },
});

export const { actions, reducer } = mainSlice;
