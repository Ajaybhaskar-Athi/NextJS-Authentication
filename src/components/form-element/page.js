import React from "react";
import { Input } from "../ui/input";

const FormElement = ({ item, value, onChange }) => {
  let content = null;
  switch (item.component) {
    case "input":
      content = (
        <Input
          name={item.name}
          id={item.name}
          placeholder={item.placeholder}
          type={item.type}
          value={value}
          onChange={onChange}
        />
      );
      break;
      default:
        content = (
            <Input
              name={item.name}
              id={item.name}
              placeholder={item.placeholder}
              type={item.type}
              value={value}
              onChange={onChange}
            />
          );
    }
  return content;
};

export default FormElement;
