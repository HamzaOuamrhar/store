import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const {data} = await axios.get('/api/products/categories')
        setCategories(data)
      }catch(err){
        toast.error(err)
      }
    }
    fetchCategories()
  }, [])
  return (
    <>
      <button onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>sidebar</button>
      <aside
        style={{
          width: "240px",
          height: "100%",
          position: "absolute",
          backgroundColor: "crimson",
          transition: "0.5s",
        }}
        className={sidebarIsOpen ? "sidebaropen" : "sidebarclose"}
      >
        <ul>
          {categories.map((category) => (
            <Link
              to={`/search?category=${category}`}
              onClick={() => setSidebarIsOpen(false)}
            >
              <li key={category}>{category}</li>
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
