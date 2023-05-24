import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import RegionDropdown from "../components/RegionSelectDropdown"

export default function Home() {
  return (
    <div>
      <NavBar/>
      <h1>Take Your League Journey to the Next Level.</h1>
      <div>
        <h3>Region</h3>
        <RegionDropdown></RegionDropdown>
        <h3>Summoner Name</h3>
        <SearchBar/>
      </div>
    </div>
);}