import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Category, Tournament, TournamentEntry } from '../interfaces';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Avatar, Table, Typography } from 'antd';
import styles from "./LeaderboardPage.module.css";
import SideBar from '../SideBar/SideBar';
import PageHeader from '../PageHeader/PageHeader';
import TournamentInfo from '../TournamentInfo/TournamentInfo';
import { getCategoryById } from '../tsfunctions';

const {Text} = Typography;

const LeaderboardPage = () => {
    const { category } = useParams();
    if ( category == undefined || !/^\d+$/.test(category)){
        window.location.href = "/home";
    }

    const [entries, setEntries] = useState<TournamentEntry[]>([]);
    const [entryFailed, setEntryFailed] = useState(true);
    const categoryName = getCategoryById(category ?? "-1");

    const [tournamenInfo, setTournamentInfo] = useState<Tournament | null>(null);

    const [dataLoading, setDataLoading] = useState(true);

    const columns = [
      {
        title: "Ranking",
        width: 100,
        render: (_ : any, record : any, index : any) => index + 1,
      },
      {
        title: "User",
        key: "user",
        render: (_ : any, record: any) => (
          <button onClick={() => window.location.href = `/profile/${record.user.id}`} className='btn btn-ghost' style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar src={record.user.profilePictureUrl ?? "/default_pp.png"} />
            <Text>{record.user.nickName}</Text>
          </button>
        ),
      },
      {
        title: "Score",
        dataIndex: "score",
        key: "score",
      },
      {
        title: "Post",
        key: "postId",
        render: (_ : any, record: any) => (
          <button onClick={() => window.location.href = `/post/${record.postId}`} className='btn btn-outline' style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            Tournament Post
          </button>
        ),
      },
    ];


    useEffect(() => {
      fetchServerData();
    },[]);


    useEffect(() => {
      console.log(entries);
    }, [entries]);

    const fetchServerData = async () => {
      await fetchTournamentData();
      await fetchTournamentEntries();
      setDataLoading(false);
    }


    const fetchTournamentData = async () => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tournaments/category/${category}`, 
          {headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
          }}
        )
        setTournamentInfo(res.data);
      }
      catch(e){

      }
    }

    const fetchTournamentEntries = async () => {
        try{
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tournaments/leaderboard/${category}`, 
            {headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
            }}
          )
          setEntries(res.data);
          setEntryFailed(false);
        }
        catch(e){
          ;
        } 
    }

  

    const renderMain = () => {
      if(dataLoading){
        return(
          <div className='flex justify-center items-center h-lvh w-full'>
            <CircularProgress/>
          </div>
        )
      }
      if (entryFailed){
        return(
          <div>
            <p className='font-bold text-lg p-5'>There are currently no tournaments for this category.</p>
          </div>
        )
      }
      return (
        <div className='w-full p-10'>
          <TournamentInfo showButton={1} info={tournamenInfo} />
          <p className='font-bold my-10 text-xl'>Leaderboard for {categoryName} category</p>
          <Table
            dataSource={entries}
            columns={columns}
            pagination={false}
            bordered
            rowKey="key"
          />
        </div> 
      ) 
    }

    
    

    return (
      <>
            <PageHeader/>
            <div className='flex'>
                <SideBar active=""/>
                {renderMain()}
                
            </div>
      </>           
    )
}

export default LeaderboardPage