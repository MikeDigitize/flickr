import React from "react";
import BootstrapWrapper from "./bootstrap-wrapper";

const Title = props => <h1>{ props.title }</h1>;
export default BootstrapWrapper(Title, "col-sm-12");