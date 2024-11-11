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

export function formatInteractions(num: number): string {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}