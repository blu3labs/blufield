import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/scrollToTop";
import Sidebar from "@/components/sidebar";
import "./index.css";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname?.split("/")?.[1] === "create" ||
      location.pathname?.split("/")?.[1] === "edit" ||
      location.pathname?.split("/")?.[1] === ""
    ) {
      document.documentElement.style.setProperty("--field-accent", "#00A9FF");
    }
  }, [location]);

  return (
    <div className="app">
      <Toaster />
      <Sidebar />
      <div className="outletWrapper">
        <div className="outlet">
          <Outlet />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}