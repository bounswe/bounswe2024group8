import { Category } from "./interfaces";

export function getCategoryById(id: string){
    const categories = require("../resources/json-files/Categories.json") as Category[];
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if (element.id == id){
            return element.text;
        }
        
    }
    return "";
}