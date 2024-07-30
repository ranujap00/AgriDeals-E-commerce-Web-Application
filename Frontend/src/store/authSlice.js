// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return serializeUser(userCredential.user);
});

// Helper function to serialize user data
const serializeUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    isLoading: true,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      signOut(auth);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;