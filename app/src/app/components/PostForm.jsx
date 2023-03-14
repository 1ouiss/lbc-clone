import { Box, Button, TextField } from "@mui/material";

const PostForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        ".MuiInputBase-root, .MuiButton-root": {
          mb: 2,
        },
      }}
    >
      <TextField variant="outlined" label="title" name="title" />
      <TextField
        variant="outlined"
        label="content"
        name="content"
        multiline
        rows={4}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
