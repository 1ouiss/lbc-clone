import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

const AutocompleteInput = ({ setCredentials }) => {
  const inputLocation = useRef(null);

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

            location.formatted_address = `${location?.streetNumber} ${location?.street}, ${location?.postalCode} ${location?.city}, ${location?.country}`;

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
      />
    </>
  );
};

export default AutocompleteInput;
