import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PostService from "../../src/services/post.service";
import Dropzone from "./Dropzone";
import MyStepper from "./Stepper";

const PostForm = () => {
  const [newPost, setNewPost] = useState({});

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [files, setFiles] = useState([]);

  const [activeStep, setActiveStep] = useState(0);

  const inputLocation = useRef(null);

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

  function AddAutoComplete() {
    const options = {
      componentRestrictions: { country: "fr" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputLocation.current,
      options
    );

    window.google.maps.event.addListener(
      autocomplete,
      "place_changed",
      function () {
        const autocompleteValue = autocomplete.getPlace();

        let location = {};
        inputLocation.current.addEventListener("keyup", (e) => {
          if (e.keyCode == 13) {
            e.stopPropagation();

            location.lat = autocompleteValue.geometry.location.lat();
            location.long = autocompleteValue.geometry.location.lng();

            location.city = autocompleteValue.address_components.find(
              (component) => component.types.includes("political")
            ).long_name;

            location.country = autocompleteValue.address_components.find(
              (component) => component.types.includes("country")
            ).long_name;

            location.postalCode = autocompleteValue.address_components.find(
              (component) => component.types.includes("postal_code")
            )?.long_name;

            location.street = autocompleteValue.address_components.find(
              (component) => component.types.includes("route")
            )?.long_name;

            location.streetNumber = autocompleteValue.address_components.find(
              (component) => component.types.includes("street_number")
            )?.long_name;

            location.administrative_area_level_1 =
              autocompleteValue.address_components.find((component) =>
                component.types.includes("administrative_area_level_1")
              )?.long_name;

            location.administrative_area_level_2 =
              autocompleteValue.address_components.find((component) =>
                component.types.includes("administrative_area_level_2")
              )?.long_name;

            location.formatted_address = `${location?.streetNumber} ${location?.street}, ${location?.postalCode} ${location?.city}, ${location?.country}`;

            setNewPost((newPost) => {
              return { ...newPost, location };
            });
          }
        });
      }
    );
  }

  useEffect(() => {
    AddAutoComplete();
  }, [inputLocation.current]);

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
          <TextField
            variant="outlined"
            label="location"
            name="location"
            inputRef={inputLocation}
          />

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
      {error && <p>Veuillez remplir tout les champs</p>}
      {success && <p>Votre formulaire a bien était envoyé</p>}
    </Box>
  );
};

export default PostForm;
