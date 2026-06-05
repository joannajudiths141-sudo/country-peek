import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h2>Home</h2>

      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>You typed: {search}</p>
    </div>
  );
}

export default Home;