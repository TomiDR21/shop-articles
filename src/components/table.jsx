import React, { useState } from 'react';
import styles from './table.module.css'
import axios from 'axios'


const Table = ({ handleChange, product, currentPage, setCurrentPage, totalPages, setTotalPages, products, listUpdated, setListUpdated, getProducts }) => {

    const productsPerPage = 10;

    const handlePrevious = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };


const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
  if (currentPage > totalPages) {
    setCurrentPage(currentPage - 1);
    
  }

};

const productsForCurrentPage = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );





//DELETE------



    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }

        fetch('http://localhost:5000/api/' + id, requestInit)
            .then(res => {
                if (res.ok) {
                    console.log('Delete successful');
                    setListUpdated(true);
                } else {
                    console.log('Delete failed');
                }
            })
            .catch(error => console.log(error));
    };



//UPDATE-------



    const handleUpdate = id => {
        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };
        fetch('http://localhost:5000/api/' + id, requestInit)
            .then(response => {
                if (response.ok) {
                    console.log('Update successful');

                    setListUpdated(true);
                    
                } else {
                    console.log('Update failed');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


//TABLE----------


    return (
        <>
            {/* <div className={styles.divTable}>
                Table
            </div> */}
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Article</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productsForCurrentPage.map(product => (
                        <tr key={product.id}>
                            {/* <td>{product.id}</td> */}
                            <td>{product.article}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td><button onClick={() => handleUpdate(product.id)} className={styles.btnEdit}><img src='/edit2.png' alt="" className={styles.btnEditImg} /></button>
                                <button onClick={() => handleDelete(product.id)} className={styles.btnDelete}><img src='./delete.png' alt="" className={styles.btnDeleteImg} /></button>
                            </td>

                        </tr>
                    ))}

                </tbody>

{/* NAVIGATION BUTTONS */}




                <div className={styles.navigation}>
                    <button onClick={() => handlePrevious()} className={styles.previousButton}><img src='flecha-izquierda.png'></img></button>
                        <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handleNext()} className={styles.nextButton}><img src='flecha-correcta.png'></img></button>
                </div>
{/* SEARCH BAR  */}
                {/* <div className={styles.searchBarContainer}>
                <input  onChange={handleChange} className={styles.searchBar} type="search" name="search-bar" placeholder='Search article...'/>
                <button type='submit' className={styles.searchButton}><img src="/search.png" alt="" className={styles.btnSearchImg}/></button>
            </div> */}
            </table>

            </>
    )
}

export default Table