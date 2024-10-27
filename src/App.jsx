import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Post from "./components/Post";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddAPost from "./components/AddAPost";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token !== null);
  }, []);

  return (
    <>
      <Navigation
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/post/:postId"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Post />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-a-post"
          element={
            <ProtectedRoute>
              <AddAPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-a-post/:postId"
          element={
            <ProtectedRoute>
              <AddAPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </>
  );
}

export default App;
