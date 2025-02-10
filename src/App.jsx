import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "./layout/LayoutPage";
import AllPost from "./Pages/Index";
import AddNew from "./Pages/AddNew";
import Preview from "./Pages/Preview";
import { useEffect } from "react";

const app = () => {
  return (
    <LayoutPage>
      <Routes>
        <Route path="/" element={<AllPost />} />
        <Route path="/add-new" element={<AddNew />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </LayoutPage>
  );
};

export default app;
