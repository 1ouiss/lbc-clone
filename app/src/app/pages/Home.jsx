import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          mb: 4,
        }}
        onClick={() => {
          navigate("/create-post");
        }}
      >
        Create new post
      </Button>
      <Typography
        variant="h2"
        sx={{
          mb: 2,
        }}
      >
        Liste des posts
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {posts &&
          posts.map((post) => (
            <Card sx={{ width: 345 }}>
              <CardMedia
                component="img"
                alt={post.title}
                height="140"
                image={post.uploadFiles[0]?.Location}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    navigate("/post/" + post._id);
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default Home;
