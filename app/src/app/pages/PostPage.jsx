import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      {isLoading && post === null ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <h1>{post.title}</h1>
          <Grid container spacing={2}>
            {post.uploadFiles.map((file) => {
              if (post.uploadFiles.length === 1) {
                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={file.Location} alt="" />
                  </Grid>
                );
              } else {
                return (
                  <>
                    <Grid item xs={6}>
                      <img src="" alt="" />
                    </Grid>
                    <Box>
                      <Grid item xs={3}>
                        <img src="" alt="" />
                      </Grid>
                      <Grid item xs={3}>
                        <img src="" alt="" />
                      </Grid>
                    </Box>
                  </>
                );
              }
            })}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default PostPage;
