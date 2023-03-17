import { Box, Grid, IconButton, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

const DropzoneUpdate = ({ credentials, setCredentials }) => {
  const [files, setFiles] = useState([]);

  //   const [imageURLs, setImageURLs] = useState(Array(7).fill(""));

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
    console.log("credentials => ", index);
    credentials.uploadFiles.splice(index, 1);
  };

  useEffect(() => {
    acceptedFiles.map((file) => {
      credentials.uploadFiles.push(file);
    });
    setCredentials(credentials);
  }, [acceptedFiles]);

  useEffect(() => {
    if (credentials) {
      setFiles(credentials.uploadFiles);
    }
  }, [credentials]);

  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Grid container spacing={3} {...getRootProps()}>
        <Grid item xs={3}>
          <Paper
            className={`dropzone-paper`}
            sx={{
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed red",
              cursor: "pointer",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "red",
              "&:hover": {
                color: "white",
                backgroundColor: "red",
                transition: "all 0.3s ease-in-out",
                border: "2px dashed white",
              },
            }}
          >
            <input {...getInputProps()} />
            <span>Ajouter des photos</span>
          </Paper>
        </Grid>
        {/* Map upload files */}
        {files.map((item, index) => (
          <Grid item xs={3}>
            <Paper
              className={`dropzone-paper`}
              sx={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed gray",
                cursor: "pointer",
                backgroundImage: `url(${
                  item._id ? item.Location : URL.createObjectURL(item)
                })`,
                filter: "grayScale(30%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <input {...getInputProps()} />
              {credentials.uploadFiles[index] && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    backgroundColor: "white",
                  }}
                >
                  <IconButton
                    onClick={(e) => deleteImage(index, e)}
                    sx={{
                      color: "black",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "white",
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        color: "black",
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}

        {/* Map skeleton file 7- x */}
        {Array(7 - files.length)
          .fill()
          .map((item, index) => (
            <Grid item xs={3}>
              <Paper
                className={`dropzone-paper`}
                sx={{
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed gray",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <input {...getInputProps()} />
                <span>Ajouter des photos</span>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default DropzoneUpdate;
