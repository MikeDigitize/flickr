import React, { Component } from "react";
import BootstrapWrapper from "./bootstrap-wrapper";

const Title = props => <h1>{ props.title }</h1>;
export default BootstrapWrapper(Title, 12, "sm");