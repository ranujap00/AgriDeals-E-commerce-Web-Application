// src/components/AuthWrapper.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { setUser, logout, setLoading } from "../store/authSlice";

const serializeUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(serializeUser(authUser)));
      } else {
        dispatch(logout());
        navigate("/login");
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [location.pathname, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      const handleTokenExpiration = setTimeout(() => {
        auth.currentUser.getIdToken(true).catch(() => {
          dispatch(logout());
          navigate("/login");
        });
      }, 55 * 60 * 1000);

      return () => clearTimeout(handleTokenExpiration);
    }
  }, [user, dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet/>;
};

export default AuthWrapper;
