import React, { useState } from 'react'
import styles from "./SideBar.module.css";
import { Category } from '../interfaces';
const SideBar = () => {
    const [categories, setCategories] = useState<Category[]>([
        {text: "Characters", url: "/home/characters"},
        {text: "Enviroments", url: "/home/enviroments"},
        {text: "Props", url: "/home/props"},
        {text: "Vehicles", url: "/home/vehicles"},
        {text: "Animations", url: "/home/animations"},
    ])
    return (
        <div className={styles.mainContainer}>
            <p className={styles.categoriesText}>Categories</p>
            <div className={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <button className={styles.categoryButton} onClick={() => window.location.href = item.url} key={`${item.url}_${index}`}>{item.text}</button>
                ))}
            </div>
        </div>
    )
}

export default SideBar