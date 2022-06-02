import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const GoogePlaces = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs"
        selectProps={{
          value,
          onChange: onChange,
          styles: {
            innerHeight: "1000vh",
            innerWidth: "100vw",
            outerHeight: "1000vh",
            border: "none",
          },
          placeholder: placeholder,
        }}
      />
    </div>
  );
};

export default GoogePlaces;
