import { Link } from "react-router-dom";


export default function Header(){


    return (
        <div className="headerDiv">
            <h2 className="headerTitle">Timeline</h2>
            <Link to="/TimelineSelectMenu" className="headerLinks">Return To Timeline Select Menu</Link>
            <Link to="/" className="headerLinks">Return To Home</Link>     
        </div>
    )
}