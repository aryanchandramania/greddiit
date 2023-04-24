import React from "react";
import Navbar from "./Navbar";
import CreateSub from "./CreateSubs";
import DisplaySubs from "./DisplayMySubs";

export default function MySubs() {
  return (
    <div>
      <Navbar />
      <br />
      <CreateSub />
      <br />
      <DisplaySubs/>
    </div>
  );
}
