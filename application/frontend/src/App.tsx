import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedOut from "./LoggedOut";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import SearchBar from "./components/SearchBar";
import SignUpPage from "./Signup";
import { PostData } from "./interfaces/postInterface";
import image1 from "./assets/dummyimages/image1.png";
import image2 from "./assets/dummyimages/image2.png";
import image4 from "./assets/dummyimages/image4.png";
import image5 from "./assets/dummyimages/image5.png";
import pp1 from "./assets/dummyimages/pp1.png";
import pp2 from "./assets/dummyimages/pp2.png";
import pp3 from "./assets/dummyimages/pp3.png";
import pp4 from "./assets/dummyimages/pp4.png";
import pp5 from "./assets/dummyimages/pp5.png";

function App() {
  const postsData: PostData[] = [
    {
      id: 1,
      profilePic: pp1,
      username: "Can Öztemiz",
      community: "Fenerbahçe",
      communityLink: "fenerbahcelink",
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
      community: "Galatasaray",
      communityLink: "galatasaraylink",
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
      community: "Rizespor",
      communityLink: "rizesporlink",
      text: "Beşiktaş deplasmanı öncesi pazar günü evimizde oynayacağımız Ankaragücü maçı büyük önem taşımaktadır. Avrupa hedefine ulaşabilmek için pazar günü takımımıza büyük destek gerekmektedir. Belediyemizin aynı şekilde  şehirde araç dolaştırıp taraftarı davet etmesi gerekmektedir.",
      likes: 73,
      dislikes: 2,
      commentsCount: 14,
    },
    {
      id: 4,
      profilePic: pp4,
      username: "çArşı",
      community: "Beşiktaş",
      communityLink: "besiktaslink",
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
      community: "Kayserispor",
      communityLink: "kayserisporlink",
      text: "Pendik deplasmanı | Kayserispor tribünü 🟡🔴 #KapalıKale",
      imageUrl: image5,
      likes: 32,
      dislikes: 1,
      commentsCount: 8,
    },
  ];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="homepage">
              <Navbar></Navbar>
              <div className="dummydiv">
                <SearchBar />
              </div>
              <Feed posts={postsData}></Feed>
              <div className="dummydiv"></div>
            </div>
          }
        />
        <Route path="/loggedout" element={<LoggedOut />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
