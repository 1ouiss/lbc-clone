import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Dropzone({ setNewPost, files, setFiles, newPost }) {
  const [imageURLs, setImageURLs] = useState(Array(7).fill(""));
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setFiles((prevFile) => {
          return [...prevFile, ...acceptedFiles];
        });
      },
    });

  const deleteImage = (index, e) => {
    e.stopPropagation();
    setFiles(files.filter((file, i) => i !== index));
    setImageURLs(imageURLs.filter((url, i) => i !== index));
  };

  useEffect(() => {
    acceptedFiles.map((file) => {
      newPost.files.push(file);
    });
    setNewPost(newPost);
  }, [acceptedFiles]);

  useEffect(() => {
    const newImageURLs = [...imageURLs];
    files.map((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newImageURLs[index] = reader.result;
        setImageURLs(newImageURLs);
      };
    });
    console.log("files => ", files);
    setNewPost((newPost) => {
      return { ...newPost, files: files };
    });
  }, [files]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} {...getRootProps()}>
        <Grid item xs={3}>
          <Paper
            className={`dropzone-paper${isDragActive ? " active" : ""}`}
            sx={{
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed gray",
              cursor: "pointer",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input {...getInputProps()} />
            <span>Ajouter des photos</span>
          </Paper>
        </Grid>
        {[...Array(7)].map((item, index) => (
          <Grid item xs={3}>
            <Paper
              className={`dropzone-paper${isDragActive ? " active" : ""}`}
              sx={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed gray",
                cursor: "pointer",
                backgroundImage: `url(${imageURLs[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <input {...getInputProps()} />
              {imageURLs[index] && (
                <Box sx={{ position: "relative", top: 0, right: 0 }}>
                  <IconButton onClick={(e) => deleteImage(index, e)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              <span>Photo {index + 1}</span>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default Dropzone;
