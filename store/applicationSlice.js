import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    enquiryDetails: null,
    selectedPlan: null,
    selectedScholarships: [],
    lockedScholarships: [], // NEW
  },
  reducers: {
    setEnquiryDetails: (state, action) => {
      state.enquiryDetails = action.payload;
    },
    setSelectedPlan: (state, action) => {
      const newPlan = action.payload;
      const limit = newPlan?.maxScholarships || 0;

      if (state.selectedScholarships.length > limit) {
        state.selectedScholarships = state.selectedScholarships.slice(0, limit);
      }

      state.selectedPlan = newPlan;
    },

    addScholarship: (state, action) => {
      const exists = state.selectedScholarships.some(
        (s) => s._id === action.payload._id,
      );

      if (!exists) {
        state.selectedScholarships.push(action.payload);
      }
    },

    removeScholarship: (state, action) => {
      state.selectedScholarships = state.selectedScholarships.filter(
        (s) => s._id !== action.payload,
      );
    },
    updateEnquiryDetails: (state, action) => {
      state.enquiryDetails = {
        ...state.enquiryDetails,
        ...action.payload,
      };
    },
    resetApplicationState: (state) => {
      state.enquiryDetails = null;
      state.selectedScholarships = [];
      state.selectedPlan = null;
    },
    setSelectedScholarships: (state, action) => {
      state.selectedScholarships = action.payload;
    },

    setLockedScholarships: (state, action) => {
      state.lockedScholarships = action.payload;
    },
  },
});

export const {
  setSelectedPlan,
  addScholarship,
  removeScholarship,
  clearApplication,
  setEnquiryDetails,
  updateEnquiryDetails,
  resetApplicationState,
  setSelectedScholarships,
  setLockedScholarships,
} = applicationSlice.actions;

export default applicationSlice.reducer;
