import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostPageForm from "./app/pages/PostPageForm";
import Home from "./app/pages/Home";
import { Container } from "@mui/material";
import PostPage from "./app/pages/PostPage";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/post")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <Container
      sx={{
        pt: 5,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/create-post" element={<PostPageForm />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
