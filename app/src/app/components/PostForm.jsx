import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PostService from "../../src/services/post.service";
import AutocompleteInput from "./AutocompleteInput";
import Dropzone from "./Dropzone";
import MyStepper from "./Stepper";

const PostForm = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    files: [],
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [files, setFiles] = useState([]);

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPost.files.length > 0 &&
      newPost.title != "" &&
      newPost.content != "" &&
      newPost.location != null
    ) {
      setActiveStep(2);
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", newPost.content);

      files.forEach(async (file) => {
        formData.append("files", file);
      });
      formData.append("location", JSON.stringify(newPost.location));

      console.log(formData.getAll("files"));

      await PostService.createPost(formData);
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
    }
  };

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
      <MyStepper activeStep={activeStep} />

      {activeStep === 0 && (
        <>
          <TextField
            variant="outlined"
            label="title"
            name="title"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            label="content"
            name="content"
            multiline
            rows={4}
            onChange={(e) => handleChange(e)}
          />

          <AutocompleteInput setCredentials={setNewPost} />

          <Button
            variant="contained"
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }}
          >
            Next
          </Button>
        </>
      )}

      {activeStep === 1 && (
        <>
          <Dropzone
            newPost={newPost}
            setNewPost={setNewPost}
            files={files}
            setFiles={setFiles}
          />

          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </>
      )}
      {activeStep === 2 && success && (
        <>
          <p>Votre formulaire a bien était envoyé</p>
          <Button>
            <Link to="/">Voir les posts</Link>
          </Button>
        </>
      )}
      {error && <p>Veuillez remplir tout les champs</p>}
    </Box>
  );
};

export default PostForm;
