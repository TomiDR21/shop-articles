import React, { useState } from 'react';
import styles from './form.module.css'
import axios from 'axios';


const Form = ({ handleSubmit, getProducts, handleChange, product }) => {





    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formDiv}>
                <label>Article</label>
                <input onChange={handleChange} type="text" name="article" placeholder='Insert article...'/>
            </div>
            <div className={styles.formDiv}>
                <label>Price</label>
                <input onChange={handleChange} type="number" name="price" placeholder='Insert price...'/>
            </div>
            <div className={styles.formDiv}>
                <label>Stock</label>
                <input onChange={handleChange} type="number" name="stock" placeholder='Insert stock...'/>
            </div>
            <div className={styles.formDiv}>
                <label>Tag</label>
                <input onChange={handleChange} type="text" name="tag" placeholder='Insert tag...'/>
            </div>
            <button className={styles.formButton} type="submit">Submit</button>
        </form>
    )
}

export default Form