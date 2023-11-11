import React from "react";
import { Helmet } from "react-helmet";
import "./index.css";


export default function NotFound() {
  return (
    <>
      <Helmet>
          <title>Page Not Found | Blufield</title>
        </Helmet>
    
    <div className="notFound">
      <span>Page Not Found</span>
    </div>
    </>
  );
}
