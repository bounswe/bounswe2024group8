import "./Community.css";
import { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import { PostData } from "./interfaces/postInterface";
import Feed from "./components/Feed";
import CommunityHeader from "./components/CommunityHeader";
import CreatePostOverlay from "./components/CreatePostOverlay.tsx";
import image1 from "./assets/dummyimages/image1.png";
import image2 from "./assets/dummyimages/image2.png";
import image4 from "./assets/dummyimages/image4.png";
import image5 from "./assets/dummyimages/image5.png";
import pp1 from "./assets/dummyimages/pp1.png";
import pp2 from "./assets/dummyimages/pp2.png";
import pp3 from "./assets/dummyimages/pp3.png";
import pp4 from "./assets/dummyimages/pp4.png";
import pp5 from "./assets/dummyimages/pp5.png";



export default function Community() {

    const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);
    const [communityName, setCommunityName] = useState<string>("");
    const [communityData, setCommunityData] = useState(null);

  const postsData: PostData[] = [
    {
      id: 1,
      profilePic: pp1,
      username: "Can Öztemiz",
      firstName: "Can",
      lastName: "Öztemiz",
      community: "Fenerbahçe",
      communityLink: "fenerbahcelink",
      title: "Fenerbahçe - Trabzonspor",
      text: "Sizce Fenerbahçe'nin Trabzonspor karşısındaki hücum hattı nasıl olmalı?",
      imageUrl: image1,
      likes: 278,
      dislikes: 12,
      commentsCount: 124,
    },
    {
      id: 2,
      profilePic: pp2,
      username: "GalaGala123",
      firstName: "GalaGala123",
      lastName: "",
      community: "Galatasaray",
      communityLink: "galatasaraylink",
      title: "Bugünkü maç hakkında",
      text: "Icardi'nin bugünkü performansı çok iyi değil miydi?",
      imageUrl: image2,
      likes: 543,
      dislikes: 23,
      commentsCount: 87,
    },
    {
      id: 3,
      profilePic: pp3,
      username: "Tahsin Gözüpek",
      firstName: "Tahsin",
      lastName: "Gözüpek",
      community: "Rizespor",
      communityLink: "rizesporlink",
      title: "Taraftara duyuru",
      text: "Beşiktaş deplasmanı öncesi pazar günü evimizde oynayacağımız Ankaragücü maçı büyük önem taşımaktadır. Avrupa hedefine ulaşabilmek için pazar günü takımımıza büyük destek gerekmektedir. Belediyemizin aynı şekilde  şehirde araç dolaştırıp taraftarı davet etmesi gerekmektedir.",
      likes: 73,
      dislikes: 2,
      commentsCount: 14,
    },
    {
      id: 4,
      profilePic: pp4,
      username: "çArşı",
      firstName: "çArşı",
      lastName: "",
      community: "Beşiktaş",
      communityLink: "besiktaslink",
      title: "ÖNEMLİ DUYURU",
      text: "FENERBAHÇE DEPLASMANINA GELECEK OLAN TARAFTARLARIMIZIN DİKKATİNE; Şanlı Beşiktaş’ımızın 27 Nisan Cumartesi günü (YARIN) oynayacağı Fenerbahçe karşılaşması öncesinde taraftarlarımız bir arada ve organize şekilde hareket etme amacıyla maç günü saat 14.00’da Tüpraş Stadyumu Kuzey Tribünü önünde toplanacaktır. \n15.00’da otobüslerle toplu bir şekilde hareket edecektir. Taraftarlarımızın belirtilen saatlere uyması yaşanacak olumsuzlukların önüne geçecektir.",
      imageUrl: image4,
      likes: 323,
      dislikes: 17,
      commentsCount: 46,
    },
    {
      id: 5,
      profilePic: pp5,
      username: "Kayserispor Fan",
      firstName: "Kayserispor",
      lastName: "Fan",
      community: "Kayserispor",
      communityLink: "kayserisporlink",
      title: "Deplasmandayız",
      text: "Pendik deplasmanı | Kayserispor tribünü 🟡🔴 #KapalıKale",
      imageUrl: image5,
      likes: 32,
      dislikes: 1,
      commentsCount: 8,
    },
  ];
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

      axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users?email=` + `${localStorage.getItem("email")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setCommunityName(response.data.community.name);
        setCommunityData(Communities[communityName.toUpperCase()])
        console.log(communityName);
      })
      .catch((error) => {
        
      });
      if (!communityData) {
        return;
      }
    return (
        <>
        <div className="Follower"></div>
        <Navbar setShowCreatePostOverlay={setShowCreatePostOverlay} />
        <CommunityHeader Community={communityData}/>
        <Feed posts={postsData} style={stylee}></Feed>
        <CreatePostOverlay
        show={showCreatePostOverlay}
        onClose={() => setShowCreatePostOverlay(false)}
        />
        </>);
}
