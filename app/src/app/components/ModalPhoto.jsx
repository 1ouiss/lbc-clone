import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import { register } from "swiper/element/bundle";

const ModalPhoto = ({ files }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    dispklay: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const styleImg = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };
  const styleButton = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    color: "white",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  };

  useEffect(() => {
    register();
    new Swiper(".swiper-image", {
      slidesPerView: 1,
    });
  }, []);

  return (
    <>
      {files.length > 3 && (
        <>
          <Button variant="contained" onClick={handleOpen}>
            Voir toutes les images
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={styleButton}
              >
                X
              </Button>
              <swiper-container
                navigation="true"
                pagination="true"
                className="swiper swiper-image"
                style={{ height: "100%" }}
              >
                {files.map((file) => {
                  return (
                    <swiper-slide>
                      <img src={file.Location} style={styleImg} />
                    </swiper-slide>
                  );
                })}
              </swiper-container>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default ModalPhoto;
