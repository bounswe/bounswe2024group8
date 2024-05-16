import "./Community.css";
import { useState ,useEffect} from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import { PostData } from "./interfaces/postInterface";
import { useNavigate,useParams } from "react-router-dom";
import CommunityHeader from "./components/CommunityHeader";
import CreatePostOverlay from "./components/CreatePostOverlay.tsx";
import CommunityBar from "./components/CommunityBar.tsx";
import image1 from "./assets/dummyimages/image1.png";
import image2 from "./assets/dummyimages/image2.png";
import image4 from "./assets/dummyimages/image4.png";
import image5 from "./assets/dummyimages/image5.png";
import pp1 from "./assets/dummyimages/pp1.png";
import pp2 from "./assets/dummyimages/pp2.png";
import pp3 from "./assets/dummyimages/pp3.png";
import pp4 from "./assets/dummyimages/pp4.png";
import pp5 from "./assets/dummyimages/pp5.png";



const Community = () =>  {
    const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);
    const [followerCount, setFollowerCount] = useState<number>(0);
    const [communityData, setCommunityData] = useState(null);
    const [communityName, setCommunityName] = useState<string>("");
    const [postsData, setPostsData] = useState<PostData[]>([]);
    const { communityName: communityNameParam } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    let CommunityPosts;

    const convertBackendDataToPostData = (backendData: any[]): PostData[] => {
      return backendData.map((post) => ({
        id: post.postId,
        profilePic: post.user.profilePicture?`data:image/png;base64,${post.user.profilePicture}`:post.user.profilePicture,
        username: post.user.id,
        firstName: post.user.firstName,
        lastName: post.user.lastName,
        community: post.postedAt,
        communityLink: post.communityLink,
        title: post.title,
        text: post.text,
        imageUrl: post.image?`data:image/png;base64,${post.image}`:post.image,
        likes: post.likes,
        dislikes: post.dislikes,
        reactionType: post.reactionType,
        bookmark: post.bookmark,
        commentsCount: post.comments
      }));
    };

    useEffect(() => {
      if (communityNameParam && communityNameParam !== "") {
        setCommunityName(communityNameParam);
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/v1/communities/${communityNameParam}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            setFollowerCount(response.data.fanaticCount);
            setCommunityData(response.data.community);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [communityNameParam]);
  
    useEffect(() => {
      if (communityNameParam) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/v1/posts/community/${communityNameParam}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            const postDataArray = convertBackendDataToPostData(response.data);
            setPostsData(postDataArray);
          })
          .catch((error) => {
            console.log("No post yet", error);
          });
      }
    }, [communityNameParam]);

    if (loading) {
      return;
    }

  const stylee = {
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    marginTop:"-100px",
    zIndex:0
    };
    const Communities = {
      "TRABZONSPOR":{"image":"https://upload.wikimedia.org/wikipedia/bs/c/cb/Trabzonspor_%28grb%29.png",
                    "name":"TRABZONSPOR COMMUNITY",
                    "year":"1907"},
      "ADANADEMIRSPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/5/5f/Adanademirspor.png/400px-Adanademirspor.png",
                    "name":"ADANA DEMİRSPOR COMMUNITY",
                    "year":"1907"},
      "ALANYASPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/2/29/Alanyaspor_logo.png/400px-Alanyaspor_logo.png",
                    "name":"ALANYASPOR COMMUNITY",
                    "year":"1907"},
      "ANTALYASPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/b/b9/Antalyaspor_logo.png/400px-Antalyaspor_logo.png",
                    "name":"ANTALYASPOR COMMUNITY",
                    "year":"1907"},
      "BESIKTAS":{"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg/1200px-Logo_of_Be%C5%9Fikta%C5%9F_JK.svg.png",
                    "name":"BEŞİKTAŞ COMMUNITY",
                    "year":"1907"},
      "RIZESPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/f/f6/%C3%87aykur_Rizespor_Logo.png/400px-%C3%87aykur_Rizespor_Logo.png",
                    "name":"ÇAYKUR RİZESPOR COMMUNITY",
                    "year":"1907"},
      "KARAGUMRUK":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/9/90/Fatihkaragumruk.png/400px-Fatihkaragumruk.png",
                    "name":"FATİH KARAGÜMRÜK COMMUNITY",
                    "year":"1907"},
      "FENERBAHCE":{"image":"https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png",
                    "name":"FENERBAHÇE COMMUNITY",
                    "year":"1907"},
      "GALATASARAY":{"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Galatasaray_Sports_Club_Logo.svg/1200px-Galatasaray_Sports_Club_Logo.svg.png",
                    "name":"GALATASARAY COMMUNITY",
                    "year":"1905"},
      "GAZIANTEP":{"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/GFK-Logo.png/400px-GFK-Logo.png",
                    "name":"GAZIANTEP FK COMMUNITY",
                    "year":"1905"},   
      "HATAYSPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/0/08/Hatayspor.png/400px-Hatayspor.png",
                    "name":"HATAYSPOR COMMUNITY",
                    "year":"1905"}, 
      "BASAKSEHIR":{"image":"https://upload.wikimedia.org/wikipedia/tr/c/cd/%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK.png",
                    "name":"BAŞAKŞEHİR COMMUNITY",
                    "year":"1905"}, 
      "ISTANBULSPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/e/ed/IstanbulsporAS.png/400px-IstanbulsporAS.png",
                    "name":"İSTANBULSPOR COMMUNITY",
                    "year":"1905"}, 
      "KASIMPASA":{"image":"https://upload.wikimedia.org/wikipedia/tr/6/68/Kasimpasa_2012.png",
                    "name":"KASIMPAŞA COMMUNITY",
                    "year":"1905"}, 
      "KAYSERISPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/c/c2/Kayserispor_logosu.png/400px-Kayserispor_logosu.png",
                    "name":"KAYSERİSPOR COMMUNITY",
                    "year":"1905"},
      "KONYASPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/4/41/Konyaspor_1922.png",
                    "name":"KONYASPOR COMMUNITY",
                    "year":"1905"},  
      "ANKARAGUCU":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/9/97/MKE_Ankarag%C3%BCc%C3%BC_logo.png/400px-MKE_Ankarag%C3%BCc%C3%BC_logo.png",
                    "name":"MKE ANKARAGÜCÜ COMMUNITY",
                    "year":"1905"},  
      "PENDIKSPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/2/2e/Pendikspor.png/400px-Pendikspor.png",
                    "name":"PENDİKSPOR COMMUNITY",
                    "year":"1905"},
      "SAMSUNSPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/d/dc/Samsunspor_logo_2.png/400px-Samsunspor_logo_2.png",
                    "name":"SAMSUNSPOR COMMUNITY",
                    "year":"1905"},
      "SIVASSPOR":{"image":"https://upload.wikimedia.org/wikipedia/tr/thumb/8/80/Sivasspor.png/400px-Sivasspor.png",
                    "name":"SİVASSPOR COMMUNITY",
                    "year":"1905"}                        
      };

      


    return (
        <>
        <div className="Follower"></div>
        <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
        <CommunityHeader Community={Communities[communityName]} FollowerCount = {followerCount}/>
        <Feed posts={postsData} style={stylee}></Feed>
        <CommunityBar/>
        <CreatePostOverlay
        show={showCreatePostOverlay}
        onClose={() => setShowCreatePostOverlay(false)}
        />
        </>);
};

export default Community;


