import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Post from "./components/Post";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
