import { createContext, useEffect, useState } from "react";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition(showPosition));
    }
  }, []);

  const showPosition = async (position) => {
    var geocoder = new window.google.maps.Geocoder();

    var latlng = new window.google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          console.log(results[0]);
          setAddress({
            formatted_address: results[0].formatted_address,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            city: results[0].address_components.find((component) =>
              component.types.includes("political")
            ).long_name,
            administrative_area_level_1: results[0].address_components.find(
              (component) =>
                component.types.includes("administrative_area_level_1")
            )?.long_name,
            administrative_area_level_2: results[0].address_components.find(
              (component) =>
                component.types.includes("administrative_area_level_2")
            )?.long_name,
            country: results[0].address_components.find((component) =>
              component.types.includes("country")
            ).long_name,
            postalCode: results[0].address_components.find((component) =>
              component.types.includes("postal_code")
            )?.long_name,
          });
          var address = results[0].formatted_address;
          console.log(address);
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressProvider };
