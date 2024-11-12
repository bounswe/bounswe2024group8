import React, { useState } from 'react'
import styles from "./SideBar.module.css";
import { Category } from '../interfaces';

interface Props{
    active: string
}

const SideBar = ({active} : Props) => {
    const [categories, setCategories] = useState<Category[]>(require("../../resources/json-files/Categories.json"));
    return (
        <div className={styles.mainContainer}>
            <p className={styles.categoriesText}>Categories</p>
            <div className={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <button className={active == item.id ? styles.activeCategoryButton : styles.categoryButton } onClick={() => window.location.href = `/home/${item.id}`} key={`${item.id}_${index}`}>{item.text}</button>
                ))}
            </div>
        </div>
    )
}

export default SideBar