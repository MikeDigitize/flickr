import React, { Component } from "react";
import { render as Output } from "react-dom";
import FlickrApp from "./components/flickr-app";

Output(<FlickrApp />, document.getElementById("flickr-app"));