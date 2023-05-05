import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "vitoria" });
  const [units, setUnits] = useState("metric");
  const [weather, setweather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const message = query.q ? query.q : "sua localização";

      toast.info("Buscando o clima de " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(`Trazendo a previsão para ${data.name}, ${data.country}`);

        setweather(data);
      });
    };
    fetchWeatherData();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 30 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto my-4 h-full max-w-screen-sm py-4 px-16 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()} rounded-md`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="previsão do dia" items={weather.hourly} />
          <Forecast title="previsão semanal" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
