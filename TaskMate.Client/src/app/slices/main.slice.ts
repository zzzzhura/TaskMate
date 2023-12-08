import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { notesApi } from "../api/notes/notes.api";
import { tasksApi } from "../api/tasks/tasks.api";

export interface MainState {
  currentNote: Note | null;
  currentTask: Task | null;
  notesList: Note[] | null;
  taskList: Task[] | null;
  sectionName: string;
}

const initialState: MainState = {
  currentNote: null,
  currentTask: null,
  notesList: null,
  taskList: null,
  sectionName: "",
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
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      notesApi.endpoints.getMyNotes.matchFulfilled,
      (state, { payload }) => {
        state.notesList = payload;
        state.taskList = null;
      }
    );

    builder.addMatcher(
      notesApi.endpoints.getMyArchived.matchFulfilled,
      (state, { payload }) => {
        state.notesList = payload;
        state.taskList = null;
      }
    );

    builder.addMatcher(
      notesApi.endpoints.getNoTags.matchFulfilled,
      (state, { payload }) => {
        state.notesList = payload;
        state.taskList = null;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getMyTasks.matchFulfilled,
      (state, { payload }) => {
        state.taskList = payload;
        state.notesList = null;
      }
    );

    builder.addMatcher(
      tasksApi.endpoints.getMyCompleted.matchFulfilled,
      (state, { payload }) => {
        state.taskList = payload;
        state.notesList = null;
      }
    );
  },
});

export const selectCurrentNote = (state: RootState) => state.main.currentNote;
export const selectCurrentTask = (state: RootState) => state.main.currentTask;
export const selectSection = (state: RootState) => state.main.sectionName;
export const selectNotes = (state: RootState) => state.main.notesList;
export const selectTasks = (state: RootState) => state.main.taskList;

export const { actions, reducer } = mainSlice;
