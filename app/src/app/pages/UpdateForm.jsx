import { TextField, Box, Button, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../src/services/post.service";
import AutocompleteInput from "../components/AutocompleteInput";
import MyStepper from "../components/Stepper";
import DropzoneUpdate from "../components/DropzoneUpdate";

const UpdateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [credentials, setCredentials] = useState({});

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      console.log("id", id);
      getPost(id);
    }
  }, [id]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const getPost = async (id) => {
    const post = await PostService.getPost(id);
    setCredentials(post);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("credentials", credentials);
    if (
      credentials.uploadFiles.length > 0 &&
      credentials.title !== "" &&
      credentials.content !== "" &&
      credentials.location != null
    ) {
      const formData = new FormData();
      formData.append("title", credentials.title);
      formData.append("content", credentials.content);
      formData.append("location", JSON.stringify(credentials.location));

      credentials.uploadFiles.forEach(async (file) => {
        // if file._id => uploadFiles
        // if !file._id => files
        if (file._id) {
          formData.append("uploadFiles", file._id);
        } else {
          formData.append("files", file);
        }
      });

      await PostService.updatePost(id, formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (success) {
      setOpenSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

  const [openSuccess, setOpenSuccess] = useState(false);

  const [openError, setOpenError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
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
            value={credentials.title}
          />
          <TextField
            variant="outlined"
            label="content"
            name="content"
            multiline
            rows={4}
            onChange={(e) => handleChange(e)}
            value={credentials.content}
          />

          <AutocompleteInput
            setCredentials={setCredentials}
            credentials={credentials}
          />

          <Box>
            <Button
              variant="contained"
              onClick={() => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              }}
            >
              Suivant
            </Button>
          </Box>
        </>
      )}

      {activeStep === 1 && (
        <>
          <DropzoneUpdate
            credentials={credentials}
            setCredentials={setCredentials}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
              }}
            >
              Précédent
            </Button>
            <Button
              variant="contained"
              onClick={(e) => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                handleSubmit(e);
              }}
            >
              Suivant
            </Button>
          </Box>
        </>
      )}

      {error && (
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Veuillez remplir tous les champs
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Votre annonce a bien été modifiée
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UpdateForm;
