'use client'

import { BrowserRouter, Navigate } from "react-router-dom";

export default function Home() {
  return (
   <div>
    <BrowserRouter>
      <Navigate to="/home" replace={true}/>
    </BrowserRouter>
   </div>
  )
}
