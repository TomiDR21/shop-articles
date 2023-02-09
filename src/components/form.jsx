import React, { useState } from 'react';
import styles from './form.module.css'
import axios from 'axios';


const Form = ({ getProducts, handleChange, product }) => {



    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api', product, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => getProducts())
            .catch(error => console.log(error));


    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formDiv}>
                <label>Article</label>
                <input onChange={handleChange} type="text" name="article" />
            </div>
            <div className={styles.formDiv}>
                <label>Price</label>
                <input onChange={handleChange} type="number" name="price" />
            </div>
            <div className={styles.formDiv}>
                <label>Stock</label>
                <input onChange={handleChange} type="number" name="stock" />
            </div>
            <button className={styles.formButton} type="submit">Submit</button>
        </form>
    )
}

export default Form