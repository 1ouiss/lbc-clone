import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostPageForm from "./app/pages/PostPageForm";
import Home from "./app/pages/Home";
import { Container } from "@mui/material";
import PostPage from "./app/pages/PostPage";
import PostService from "./src/services/post.service";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts = await PostService.getAllPosts();
    setPosts(posts);
  };

  if (!window.google) return null;

  return (
    <Container
      sx={{
        pt: 5,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home posts={posts} setPosts={setPosts} />}
          />
          <Route path="/create-post" element={<PostPageForm />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
