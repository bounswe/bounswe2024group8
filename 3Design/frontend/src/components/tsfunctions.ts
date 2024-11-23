import { Category, DPost } from "./interfaces";

export function getCategoryById(id: string){
    const categories = require("../resources/json-files/Categories.json") as Category[];
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if (element.id == id){
            return element.name;
        }
        
    }
    return "";
}

export function formatInteractions(num: number): string {
    if (!num){
        return "0";
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

export function getPostFromId(id: string | undefined){
    if (!id){
        return null;
    }
    const intId = parseInt(id);
    const posts = require("../resources/json-files/MockGenericPosts.json");
    for (let i = 0; i < posts.length; i++) {
        const element: DPost = posts[i];
        if (element.postId == intId){
            return element;
        }
        
    }
    return null;
}

export function limitPostBodies(x:string){
    let count = 0;
    for (let i = 0; i < x.length; i++) {
        if (x.charAt(i) == "\n"){
            count += 50;
            continue;
        }
        count++;
    }
    return count > 1024;
}

export function getProfileFromId(id: string | undefined){
    if (!id){
        return null;
    }
    const intId = parseInt(id);
    const posts = require("../resources/json-files/MockProfiles.json");
    for (let i = 0; i < posts.length; i++) {
        const element: DPost = posts[i];
        if (element.postId == intId){
            return element;
        }
        
    }
    return null;
}