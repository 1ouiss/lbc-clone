import { TextField } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { AddressContext } from "../../src/context/AddressContext";

const AutocompleteInput = ({ setCredentials, credentials }) => {
  const inputLocation = useRef(null);

  const { address } = useContext(AddressContext);

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
            e.preventDefault();
            e.stopPropagation();

            location.lat = autocompleteValue.geometry.location.lat();
            location.lng = autocompleteValue.geometry.location.lng();

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

            if (
              location?.street != undefined &&
              location?.streetNumber != undefined
            ) {
              location.formatted_address = `${location?.streetNumber} ${location?.street}, ${location?.postalCode} ${location?.city}, ${location?.country}`;
            } else {
              location.formatted_address = `${location?.city}, ${location?.country}`;
            }

            setCredentials((credentials) => {
              return { ...credentials, location };
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
    <>
      <TextField
        variant="outlined"
        label="location"
        name="location"
        inputRef={inputLocation}
        value={
          (credentials && credentials.location?.formatted_address) ||
          credentials.location ||
          (window.location.pathname === "/create-post" && address
            ? address.formatted_address
            : "")
        }
        onChange={(e) => {
          setCredentials((credentials) => {
            return { ...credentials, location: e.target.value };
          });
        }}
      />
    </>
  );
};

export default AutocompleteInput;
