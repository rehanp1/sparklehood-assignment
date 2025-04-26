import { Incident } from "../assets/types";
import Card from "./Card";

const ListView = ({ incidents }: { incidents: Incident[] }) => {
  return (
    <div>
      {incidents.map((item, _) => (
        <Card key={item.id} item={item} />
      ))}

      {incidents.length === 0 && (
        <h4 style={{ marginInline: "auto", width: "fit-content" }}>
          Not Found
        </h4>
      )}
    </div>
  );
};

export default ListView;
