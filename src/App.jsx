import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Post from "./components/Post";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
