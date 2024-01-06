import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function View() {
const navigate  = useNavigate();
const { url } = useParams();
const [moviepage, setmoviepage] = useState({});
useEffect(()=>{ 
  fetch(`https://trip-backend-eight.vercel.app/Triplist/${url}`)
   .then((data) => data.json())
   .then((mvs) => console.log(mvs));},[url]);

  return (
    <div className="view_dev">

      <div>
        <img src="./img/tirupathi.jpg" className="view_img" alt="Thirupathi" />
      </div>
      <div className="view-body">

        <div className="view-con">
          <p className="left_side">Trip</p>
          <p className="left_side">City</p>
          <p className="left_side">Start Date</p>
          <p className="left_side">End Date</p>
          <p className="left_side" id="route_tit">Route</p>
          <p className="left_side">Budjet</p>
          <p className="left_side">Status</p>
          <p className="left_side" id="route_tit">Members</p>
          <p className="left_side">Command</p>
        </div>
        <div className="view-con2">
          <p>: Thirupathi </p>
          <p>: Thirupathi / Andhra pradesh </p>
          <p>: 12-10-2023 </p>
          <p>: 12-10-2023 </p>
          <p >: Chennai- Renigunta - kalahasti - Thirupathui </p>
          <p>: 500 /per head </p>
          <p>: Trip Completed <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" color="green" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
          </svg> </p>
          <p>: Surya - venkatesan - Vijayakumar -Gnanavel </p>
          <p>: Gnanavel is return to chennai not completed trip. because over crowd to  thirupathi </p>
        </div>

      </div>
      <div style={{marginBottom:"20px"}}className="back_btn"><button onClick={()=>navigate(-1)} className="btn btn-secondary btn-sec-click">Back</button></div>
    </div>
  );
}