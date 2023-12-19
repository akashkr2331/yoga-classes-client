
import { useNavigate } from "react-router-dom";
import "../styles/home.css"

const Home=()=>{
    const navigate=useNavigate();

    return(
        <div>
        <div className="main">
        {/* <h1>Home Page</h1> */}
        <p>A flower does not think of competing to the flower next to it.</p>

        <p>It's not about being good at something. It's about being good to yourself.</p>
         
         
    </div>
    <div className="button-div"><button onClick={() => navigate("/Form")}>Proceeed to filling The form &#8594;</button></div>
    </div>
    )
}

export default Home;

