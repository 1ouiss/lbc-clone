import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../src/services/post.service";
import AutocompleteInput from "../components/AutocompleteInput";

const Home = ({ posts, setPosts }) => {
  const navigate = useNavigate();

  const [searchAddress, setSearchAddress] = useState({});

  const handleSearch = async () => {
    const searchResult = await PostService.filterPosts(searchAddress.location);
    setPosts(searchResult);
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

      <Box>
        <Typography variant="h6">Filtres</Typography>
        <AutocompleteInput
          setCredentials={setSearchAddress}
          credentials={searchAddress}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleSearch();
          }}
        >
          Search
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
                  Voir plus
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default Home;
