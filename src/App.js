import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Nav from './components/nav';
import Table from './components/table';
import Form from './components/form';
import axios from 'axios';



function App() {
  const [listUpdated, setListUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);



  const [product, setProduct] = useState({
    // article: '',
    // price: 0,
    // stock: 0
})





const handleChange = (e) => {
    setProduct({

        ...product,
        [e.target.name]: e.target.value
    })
    console.log(product)
}



  
  const getProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api?page=${currentPage}&limit=10`);
      setProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / 10));
    } catch (error) {
      console.log(error);
    }
  };
  


  //PRODUCTS BY TAG
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const tags = ['coso', 'electronics', 'clothing', 'books'];
  
  const handleNavClick = tag => {
    console.log(`Selected tag: ${tag}`);

    setSelectedTag(tag);
  };
  const getProductByTag = async (selectedTag) => {
    console.log("Selected tag (in getProductByTag): ", selectedTag);
    try {
      const response = await fetch(`/api/${selectedTag}`);
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
  

  return (
    <Fragment>
    <Nav 
    tags={tags}
    handleNavClick={handleNavClick}
    activeTag={selectedTag}
    >

    </Nav>
    
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
      handleChange={handleChange}>

      </Table>



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
