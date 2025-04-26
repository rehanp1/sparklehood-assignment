import { useMemo, useState } from "react";
import "./App.css";
import ListView from "./components/ListView";
import Form from "./components/Form.tsx";
import { incidentData } from "./assets/config.ts";
import { Incident } from "./assets/types.ts";

function App() {
  const [data, setData] = useState<Incident[]>(incidentData);

  const [filterType, setFilterType] = useState<string>("All");
  const [sortType, setSortType] = useState<"Newest" | "Oldest">("Newest");

  const addIncident = (newIncident: Incident) => {
    setData((prev) => [...prev, newIncident]);
  };

  const filteredUsers = useMemo(() => {
    return filterType === "All"
      ? data
      : data.filter((item) => item.severity === filterType);
  }, [filterType, data]);

  sortType === "Newest"
    ? filteredUsers.sort((a, b) => (a.reported_at < b.reported_at ? 1 : -1))
    : filteredUsers.sort((a, b) => (a.reported_at > b.reported_at ? 1 : -1));

  return (
    <>
      <h1 className="task--heading">AI Safety Incident Dashboard</h1>

      <Form addIncident={addIncident} />

      <div className="container">
        {/* Filter Options */}
        <div className="select--container">
          <span>Filter</span>
          <select
            name="severity"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Sort options */}
        <div className="select--container">
          <span>Sort</span>
          <select
            name="sorting"
            onChange={(e) => setSortType(e.target.value as "Newest" | "Oldest")}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      <ListView incidents={filteredUsers} />
    </>
  );
}

export default App;
