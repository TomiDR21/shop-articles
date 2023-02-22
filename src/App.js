import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/nav";
import Table from "./components/table";
import Form from "./components/form";
import axios from "axios";

function App() {
  const [listUpdated, setListUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value.toUpperCase(),
    });
    console.log(product);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api?page=${currentPage}&limit=10`
      );
      setProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error);
    }
  };

  //PRODUCTS BY TAG
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const tags = ["PINTURAS", "AL CARPINTERO", "EQ ARTE", "PROVEEDOR"];


  const handleNavClick = (tag) => {
    console.log(`Selected tag: ${tag}`);
    setSelectedTag(tag);
    getProductByTag(tag);
  };
  
  const getProductByTag = async (selectedTag) => {
    console.log("Selected tag (in getProductByTag): ", selectedTag);

    try {
      const response = await fetch(`http://localhost:5000/api/${selectedTag}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      if (selectedTag) {
        await getProductByTag();
      }
      setListUpdated(false);
    };

    fetchData();
  }, [currentPage, selectedTag, listUpdated]);





  //RETURN-------------------------





  return (
    <Fragment>
      <Nav
      data={data}
        tags={tags}
        handleNavClick={handleNavClick}
        activeTag={selectedTag}
      ></Nav>

      <div className="app-container">
        <Table
          product={product}
          products={products}
          listUpdated={listUpdated}
          setListUpdated={setListUpdated}
          getProducts={getProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          handleChange={handleChange}
          selectedTag={selectedTag }
        ></Table>

        <Form
          getProducts={getProducts}
          handleChange={handleChange}
          product={product}
        ></Form>
      </div>
    </Fragment>
  );
}

export default App;
