import { useState } from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Dashboard />
    </div>
  );
}
