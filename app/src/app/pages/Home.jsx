import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ posts }) => {
  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const [postsSearch, setPostsSearch] = useState([]);

  const handleSearch = () => {
    console.log("search");
    console.log(searchWord);
  };

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

      <Box component="form">
        <Typography variant="h3">Filtres</Typography>
        <TextField
          variant="outlined"
          label="Search"
          sx={{
            mb: 4,
          }}
          onChange={(e) => setSearchWord(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            mb: 4,
          }}
          onClick={() => handleSearch()}
        >
          Rechercher
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {posts &&
          posts.map((post) => (
            <Card sx={{ width: 345 }} key={post._id}>
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
