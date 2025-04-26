import { ChangeEvent, FormEvent, useState } from "react";
import { Incident } from "../assets/types";

type Props = {
  addIncident: (val: Incident) => void;
};

const Form = ({ addIncident }: Props) => {
  const [newIncident, setNewIncident] = useState<Incident>({
    id: 0,
    title: "",
    description: "",
    severity: "Low",
    reported_at: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const final = {
      ...newIncident,
      id: Date.now(),
      reported_at: new Date().toISOString(),
    };
    addIncident(final);

    setNewIncident({
      id: 0,
      title: "",
      description: "",
      severity: "",
      reported_at: "",
    });
  };

  const validate = () => {
    const newErrors = { title: "", description: "" };

    if (!newIncident.title) {
      newErrors.title = "Title is required.";
    }
    if (!newIncident.description) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return newErrors.title === "" && newErrors.description === "";
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title input  */}
      <h4 style={{ width: "fit-content", marginInline: "auto" }}>
        Report New Incident
      </h4>
      <section>
        <input
          type="text"
          name="title"
          value={newIncident?.title}
          placeholder="Title"
          onChange={(e) => handleChange(e)}
        />
        {errors.title && (
          <p style={{ color: "red", marginTop: "-6px" }}>{errors.title}</p>
        )}
      </section>

      {/* Textarea input */}

      <section>
        <textarea
          rows={4}
          name="description"
          value={newIncident?.description}
          placeholder="Description"
          onChange={(e) => handleChange(e)}
        />
        {errors.description && (
          <p style={{ color: "red", marginTop: "-6px" }}>
            {errors.description}
          </p>
        )}
      </section>

      {/* severity options */}
      <div className="flexbox">
        <div className="select--container">
          <span>Severity</span>
          <select name="severity" onChange={(e) => handleChange(e)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
