import { useState } from "react";
import { Incident } from "../assets/types";

const Card = ({ item }: { item: Incident }) => {
  const [isOpen, setIsOpen] = useState<false | true>(false);

  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div key={item.id} className="incident--card">
      <div className="card--heading">
        <h4>{item.title}</h4>
        <p onClick={handleChange}>{isOpen ? "Hide Detail" : "View Details"}</p>
      </div>

      {isOpen ? (
        <p>{item.description}</p>
      ) : (
        <p>{item.description.slice(0, 55)}...</p>
      )}

      <section>
        <span className="tag">{item.severity}</span>
        <span>Date: {item.reported_at.split("T")[0]}</span>
      </section>
    </div>
  );
};

export default Card;
