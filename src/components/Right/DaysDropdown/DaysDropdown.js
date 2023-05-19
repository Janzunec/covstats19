import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function DaysDropdown(props) {
  const [days, setDays] = useState(true);

  const daysArr = [
    { name: "Today", value: false },
    { name: "All Time", value: true },
  ];

  const daysChangeHandler = (e) => {
    setDays(e.target.value);
    props.onDayChange(e.target.value);
  };

  return (
    <div>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={days}
          onChange={daysChangeHandler}
          style={{
            height: "40px",
            border: "1px solid #ddd",
            color: "#999",
            minWidth: "100px",
            borderRadius: "12px",
          }}
        >
          return (
          {daysArr.map((el) => {
            return (
              <MenuItem key={Math.random()} value={el.value}>
                {el.name}
              </MenuItem>
            );
          })}
          );
        </Select>
      </FormControl>
    </div>
  );
}
