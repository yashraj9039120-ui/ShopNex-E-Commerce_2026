// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Api from "../../constants/axiosInstance";
// import { getConfig } from "../../constants/config";


// // ---------------- ASYNC THUNKS ---------------- //

// // Register
// export const register = createAsyncThunk(
//   "user/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/api/v1/register", userData, getConfig("form"));

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Registration failed" });
//     }
//   }
// );

// // Login
// export const login = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/api/v1/login", { email, password }, getConfig());
       
//     localStorage.setItem("token", data.token); // <-- store token for later use
//     console.log("Token in localStorage:", localStorage.getItem("token"));

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Login failed" });
//     }
//   }
// );

// // Load User
// export const loadUser = createAsyncThunk(
//   "user/loadUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.get("/api/v1/profile", getConfig());
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Failed to load user profile" });
//     }
//   }
// );

// // Logout
// export const logout = createAsyncThunk(
//   "user/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/api/v1/logout", {}, getConfig());
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Logout failed" });
//     }
//   }
// );

// // Update Profile
// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.put("/api/v1/profile/update", userData, getConfig("form"));
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Profile update failed" });
//     }
//   }
// );

// // Update Password
// export const updatePassword = createAsyncThunk(
//   "user/updatePassword",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.put("/api/v1/password/update", formData, getConfig());
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Password update failed" });
//     }
//   }
// );

// // Forgot Password
// export const forgotPassword = createAsyncThunk(
//   "user/forgotPassword",
//   async (email, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post("/api/v1/password/forgot", { email }, getConfig());
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Email sending failed" });
//     }
//   }
// );

// // Reset Password
// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async ({ token, userData }, { rejectWithValue }) => {
//     try {
//       const { data } = await Api.post(`/api/v1/reset/${token}`, userData, getConfig());
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Password reset failed" });
//     }
//   }
// );

// // ---------------- SLICE ---------------- //
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//     loading: false,
//     error: null,
//     success: false,
//     isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
//     message: null,
//   },
//   reducers: {
//     removeErrors: (state) => {
//       state.error = null;
//     },
//     removeSuccess: (state) => {
//       state.success = null;
//       state.message = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Helper function to handle common pending state
//     const handlePending = (state) => {
//       state.loading = true;
//       state.error = null;
//     };

//     // ------------------ REGISTER ------------------ //
//     builder
//       .addCase(register.pending, handlePending)
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.success;
//         state.user = action.payload?.user || null;
//         state.isAuthenticated = Boolean(action.payload?.user);
//         localStorage.setItem("user", JSON.stringify(state.user));
//         localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Registration failed";
//         state.user = null;
//         state.isAuthenticated = false;
//       });

//     // ------------------ LOGIN ------------------ //
//     builder
//       .addCase(login.pending, handlePending)
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.success;
//         state.user = action.payload?.user || null;
//         state.isAuthenticated = Boolean(action.payload?.user);
//         localStorage.setItem("user", JSON.stringify(state.user));
//         localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Login failed";
//         state.user = null;
//         state.isAuthenticated = false;
//       });

//     // ------------------ LOAD USER ------------------ //
//     builder
//       .addCase(loadUser.pending, handlePending)
//       .addCase(loadUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload?.user || null;
//         state.isAuthenticated = Boolean(action.payload?.user);
//         localStorage.setItem("user", JSON.stringify(state.user));
//         localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
//       })
//       .addCase(loadUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to load user profile";
//         state.user = null;
//         state.isAuthenticated = false;
//         if (action.payload?.statusCode === 401) {
//           localStorage.removeItem("user");
//           localStorage.removeItem("isAuthenticated");
//         }
//       });

//     // ------------------ LOGOUT ------------------ //
//     builder
//             .addCase(logout.fulfilled, (state) => {
//          state.loading = false;
//          state.user = null;
//          state.isAuthenticated = false;
//         localStorage.removeItem("user");
//          localStorage.removeItem("isAuthenticated");
//          localStorage.removeItem("token"); // remove token too
// })

//       .addCase(logout.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Logout failed";
//       });

//     // ------------------ UPDATE PROFILE ------------------ //
//     builder
//       .addCase(updateProfile.pending, handlePending)
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload?.user || state.user;
//         state.success = action.payload?.success;
//         state.message = action.payload?.message;
//         localStorage.setItem("user", JSON.stringify(state.user));
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Profile update failed";
//       });

//     // ------------------ UPDATE PASSWORD ------------------ //
//     builder
//       .addCase(updatePassword.pending, handlePending)
//       .addCase(updatePassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload?.success;
//       })
//       .addCase(updatePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Password update failed";
//       });

//     // ------------------ FORGOT PASSWORD ------------------ //
//     builder
//       .addCase(forgotPassword.pending, handlePending)
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload?.success;
//         state.message = action.payload?.message;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Email sending failed";
//       });

//     // ------------------ RESET PASSWORD ------------------ //
//     builder
//       .addCase(resetPassword.pending, handlePending)
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload?.success;
//         state.user = null;
//         state.isAuthenticated = false;
//         localStorage.removeItem("user");
//         localStorage.removeItem("isAuthenticated");
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Password reset failed";
//       });
//   },
// });

// // ---------------- EXPORT ---------------- //
// export const { removeErrors, removeSuccess } = userSlice.actions;
// export default userSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../constants/axiosInstance";

// ---------------- ASYNC THUNKS ---------------- //

// Register
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/register", userData);
      // store token if backend sends it
      if (data.token) localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Registration failed" });
    }
  }
);

// Login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/login", { email, password });
      if (data.token) localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to load user profile" });
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/api/v1/profile/update", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Profile update failed" });
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/api/v1/password/update", formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Password update failed" });
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/password/forgot", { email });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Email sending failed" });
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/api/v1/reset/${token}`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Password reset failed" });
    }
  }
);

// ---------------- SLICE ---------------- //
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    // ------------- REGISTER -------------
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
        state.user = null;
        state.isAuthenticated = false;
      });

    // ------------- LOGIN -------------
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
        state.user = null;
        state.isAuthenticated = false;
      });

    // ------------- LOAD USER -------------
    builder
      .addCase(loadUser.pending, handlePending)
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load user profile";
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      });

    // ------------- LOGOUT -------------
    builder
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed";
      });

    // ------------- UPDATE PROFILE -------------
    builder
      .addCase(updateProfile.pending, handlePending)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || state.user;
        state.success = action.payload.success;
        state.message = action.payload.message;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Profile update failed";
      });

    // ------------- UPDATE PASSWORD -------------
    builder
      .addCase(updatePassword.pending, handlePending)
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password update failed";
      });

    // ------------- FORGOT PASSWORD -------------
    builder
      .addCase(forgotPassword.pending, handlePending)
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Email sending failed";
      });

    // ------------- RESET PASSWORD -------------
    builder
      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        // optional: auto login after reset, otherwise logout user
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password reset failed";
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
