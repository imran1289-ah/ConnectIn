import React, { useEffect } from "react";
import SignUp from "./SignUp";

function PageSetUp(props) {
  useEffect(() => {
    document.title = `${props.title}`;
  }, [props.title]);
}

export default PageSetUp;
