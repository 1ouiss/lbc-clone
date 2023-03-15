import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const PostPageForm = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        variant="outlined"
        sx={{
          mb: 4,
        }}
        onClick={(e) => {
          navigate("/");
        }}
      >
        Go back
      </Button>
      <Typography variant="h2">Create a new post</Typography>
      <PostForm />
    </Box>
  );
};

export default PostPageForm;
