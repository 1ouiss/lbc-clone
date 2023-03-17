import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../src/services/post.service";
import ModalPhoto from "../components/ModalPhoto";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) getPost(id);
  }, [id]);

  const getPost = async (id) => {
    const post = await PostService.getPost(id);
    setPost(post);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && post === null ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <Typography variant="h2" color="initial">
            {post.title}
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{
              m: 3,
            }}
          >
            {post?.uploadFiles?.length > 2 ? (
              <Grid container spacing={3}>
                <Grid item xs={6} md={6}>
                  {post._id && post.uploadFiles.length > 0 && (
                    <img
                      style={{ width: "100%" }}
                      src={post.uploadFiles[0]?.Location}
                      alt=""
                    />
                  )}
                </Grid>
                <Grid item xs={6} md={6} container>
                  <Grid item xs={12}>
                    {post._id && post.uploadFiles.length > 0 && (
                      <img
                        style={{ width: "50%" }}
                        src={post.uploadFiles[1]?.Location}
                        alt=""
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {post._id && post.uploadFiles.length > 0 && (
                      <img
                        style={{ width: "50%" }}
                        src={post.uploadFiles[2]?.Location}
                        alt=""
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                {post._id && post.uploadFiles.length > 0 && (
                  <img src={post.uploadFiles[0]?.Location} alt="" />
                )}
              </Grid>
            )}
          </Grid>

          <Typography variant="h5" color="initial">
            {post.content}
          </Typography>

          <ModalPhoto files={post.uploadFiles} />

          <Button
            variant="outlined"
            sx={{
              mt: 4,
            }}
            onClick={(e) => {
              navigate("/edit-post/" + post._id);
            }}
          >
            Edit
          </Button>
        </Box>
      )}
    </div>
  );
};

export default PostPage;
