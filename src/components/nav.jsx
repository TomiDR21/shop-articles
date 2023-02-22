import React from "react";
import styles from "./nav.module.css";
import Table from "./table";
import { useState } from "react";

const Nav = ({ products , handleNavClick, activeTag, tags }) => {






  return (
    <>
    <nav className={styles.navContainer}>
    {tags.map((tag) => (
      <button 
  
        key={tag}
        className={tag === activeTag ? 'active' : ''}
        onClick={() => handleNavClick(tag)}
      >
        {tag}
      </button>
    
    ))}
    </nav>

     
    
    </>
  );
};

export default Nav;
