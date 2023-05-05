import React, { useState } from "react";
import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(event);
      setCity("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Buscando a localização!");

      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Localização encontrada!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat, lon });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-3">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          type="text"
          placeholder="Pesquise uma cidade..."
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className="text-lg font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-md"
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilMapMarker
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-2">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
