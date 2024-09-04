import * as React from "react";
import { spfi } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import { IFAQ } from "../../../Interfaces";

interface IHelloProps {
  sp: ReturnType<typeof spfi>;
}

const Child: React.FC<IHelloProps> = ({sp}) => {
  const [items, setItems] = React.useState<IFAQ[]>([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await sp.web.lists.getByTitle("FAQ").items();
        console.log(items);
        setItems(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  return <ul>
  {items.map(i => (
    <li>{i.Title}</li>
  ))}
</ul>;
};

export default Child;
