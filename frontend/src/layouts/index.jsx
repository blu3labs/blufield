import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/scrollToTop";
import Sidebar from "@/components/sidebar";
import "./index.css";

export default function Layout() {


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
