import "./CommunityBar.css";
import { Link } from "react-router-dom";

const CommunityBar = () => {

return (<div className="CommBarContainer">
        <div className="ikinci">
            <h2>COMMUNITIES</h2>
            <Link className="CommLink" to="/community/ADANADEMIRSPOR" replace>ADANA DEMİRSPOR</Link><br/>
            <Link className="CommLink" to="/community/ALANYASPOR" replace>ALANYASPOR</Link><br/>
            <Link className="CommLink" to="/community/ANTALYASPOR" replace>ANTALYASPOR</Link><br/>
            <Link className="CommLink" to="/community/BESIKTAS" replace>BEŞİKTAŞ</Link><br/>
            <Link className="CommLink" to="/community/RIZESPOR" replace>ÇAYKUR RİZESPOR</Link><br/>
            <Link className="CommLink" to="/community/KARAGUMRUK" replace>FATİH KARAGÜMRÜK</Link><br/>
            <Link className="CommLink" to="/community/FENERBAHCE" replace>FENERBAHÇE</Link><br/>
            <Link className="CommLink" to="/community/GALATASARAY" replace>GALATASARAY</Link><br/>
            <Link className="CommLink" to="/community/GAZIANTEP" replace>GAZİANTEP</Link><br/>
            <Link className="CommLink" to="/community/HATAYSPOR" replace>HATAYSPOR</Link><br/>
            <Link className="CommLink" to="/community/BASAKSEHIR" replace>BAŞAKŞEHİR</Link><br/>
            <Link className="CommLink" to="/community/ISTANBULSPOR" replace>İSTANBULSPOR</Link><br/>
            <Link className="CommLink" to="/community/KASIMPASA" replace>KASIMPAŞA</Link><br/>
            <Link className="CommLink" to="/community/KAYSERISPOR" replace>KAYSERİSPOR</Link><br/>
            <Link className="CommLink" to="/community/KONYASPOR" replace>KONYASPOR</Link><br/>
            <Link className="CommLink" to="/community/ANKARAGUCU" replace>MKE ANKARAGÜCÜ</Link><br/>
            <Link className="CommLink" to="/community/PENDIKSPOR" replace>PENDİKSPOR</Link><br/>
            <Link className="CommLink" to="/community/SAMSUNSPOR" replace>SAMSUNSPOR</Link><br/>
            <Link className="CommLink" to="/community/SIVASSPOR" replace>SİVASSPOR</Link><br/>
            <Link className="CommLink" to="/community/TRABZONSPOR" replace>TRABZONSPOR</Link>
        </div>


        </div>);






    
};

export default CommunityBar;