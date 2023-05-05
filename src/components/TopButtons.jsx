function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "São Paulo",
    },
    {
      id: 2,
      title: "Vitória",
    },
    {
      id: 3,
      title: "Rio de Janeiro",
    },
    {
      id: 4,
      title: "Brasília",
    },
    {
      id: 5,
      title: "Manaus",
    },
  ];

  return (
    <div className="flex items-center justify-around mt-2 mb-4">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-normal"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
