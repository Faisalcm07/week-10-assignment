import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "./components/nav";


export default function Home() {
  return (

    <div><Navbar/>
    <div className="home-container">
      
    
      <header className="header">
        <h1>Movie Explorer</h1>
        <p>Discover amazing films from directors around the world.</p>

        <Link href="/movies" className="movies-button">
          View All Movies
        </Link>
      </header>
    </div>
    </div>
  );
}