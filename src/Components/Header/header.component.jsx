import { Link } from "react-router-dom";


export const Header = ({setSearch,setUrl,search}) => {
    return (
        <div className="header">
            <div className="title">
                <h1> Area 51 </h1>
            </div>
            <Link to="/form" style={{ textDecoration: 'none' }} className="form">
                <h1> Headquarters </h1>
            </Link>
            <button            
                onClick={() => {
                setSearch(!search);
                var s = window.location.href;
                s = s+"Mapsearch";
                setUrl(s);
                console.log(s);
            }}> Search </button>
        </div>
    );
}