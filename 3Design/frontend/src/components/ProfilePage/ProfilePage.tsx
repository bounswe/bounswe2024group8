import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileFromId } from "../tsfunctions";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./ProfilePage.module.css"
import { Profile } from '../interfaces'

const ProfilePage = () => {
  
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
      setProfile(getProfileFromId(id)); 
   }, []);


  if (!id){
      return <div>404</div>;
  }
  if(!profile){
      return <div>Loading</div>;   
  }
  

  return (
  <>
          <PageHeader/>
          <div className='flex'>
              <SideBar active={""}/>
              <div className={styles.mainContainer}>
                testing
              </div> 
              
          </div>

      
  </>);
}

export default ProfilePage;