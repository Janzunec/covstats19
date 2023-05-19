import { Autocomplete, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import "./CountriesDropdown.css";

export default function Dropdown(props) {
  const countryChangeHandler = (e, newValue) => {
    props.onChangeCountry(newValue);
  };

  const [value, setValue] = useState(props.countriesArr[0]);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "gray",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gray",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "#eceff1",
        borderRadius: 15,
      },
      "&:hover fieldset": {
        border: "2px solid #ccc",
      },
      "&.Mui-focused fieldset": {
        border: "3px inset #ccc",
      },
    },
  });

  return (
    <div className="dropdown">
      <Autocomplete
        value={value}
        id="combo-box-demo"
        options={props.countriesArr}
        sx={{
          width: "100%",
          backgroundColor: "#eceff1",
          borderRadius: "15px",
        }}
        onChange={countryChangeHandler}
        renderInput={(params) => {
          return (
            <CssTextField
              {...params}
              label="&nbsp;🌍 Search location"
              id="custom-css-input"
              style={{
                borderRadius: "15px",
              }}
            />
          );
        }}
      />
    </div>
  );
}
