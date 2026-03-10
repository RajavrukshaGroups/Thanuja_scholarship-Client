import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   selectedPlan: null,
//   selectedScholarships: [],
// };

// const applicationSlice = createSlice({
//   name: "application",
//   initialState,
//   reducers: {
//     setSelectedPlan: (state, action) => {
//       state.selectedPlan = action.payload;
//       state.selectedScholarships = []; // reset if plan changes
//     },

//     addScholarship: (state, action) => {
//       state.selectedScholarships.push(action.payload);
//     },

//     removeScholarship: (state, action) => {
//       state.selectedScholarships = state.selectedScholarships.filter(
//         (s) => s._id !== action.payload,
//       );
//     },

//     clearApplication: (state) => {
//       state.selectedPlan = null;
//       state.selectedScholarships = [];
//     },
//   },
// });

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    selectedPlan: null,
    selectedScholarships: [],
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
      state.selectedScholarships.push(action.payload);
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
} = applicationSlice.actions;

export default applicationSlice.reducer;
