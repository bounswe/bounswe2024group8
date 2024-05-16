import "./CommunityBar.css";
import { Link } from "react-router-dom";

const CommunityBar = () => {

return (<div className="CommBarContainer">
        <div className="ikinci">
            <h2>COMMUNITIES</h2>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/ADANADEMIRSPOR";}}>ADANA DEMİRSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/ALANYASPOR";}} >ALANYASPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/ANTALYASPOR";}} >ANTALYASPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/BESIKTAS";}} >BEŞİKTAŞ</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/RIZESPOR";}} >ÇAYKUR RİZESPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/KARAGUMRUK";}} >FATİH KARAGÜMRÜK</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/FENERBAHCE";}} >FENERBAHÇE</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/GALATASARAY";}} >GALATASARAY</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/GAZIANTEP";}} >GAZİANTEP</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/HATAYSPOR";}} >HATAYSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/BASAKSEHIR";}} >BAŞAKŞEHİR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/ISTANBULSPOR";}} >İSTANBULSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/KASIMPASA";}} >KASIMPAŞA</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/KAYSERISPOR";}} >KAYSERİSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/KONYASPOR";}} >KONYASPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/ANKARAGUCU";}} >MKE ANKARAGÜCÜ</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/PENDIKSPOR";}} >PENDİKSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/SAMSUNSPOR";}} >SAMSUNSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/SIVASSPOR";}} >SİVASSPOR</a><br/>
            <a className="CommLink" onClick={()=>{window.location.href = "/community/TRABZONSPOR";}} >TRABZONSPOR</a>
        </div>


        </div>);






    
};

export default CommunityBar;