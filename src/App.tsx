import "./styles/globals.css";

const mockData = {
  name: "John Doe",
  number: "1234567890",
  attacks: {
    special: [
      {
        name: "Special Attack 1",
        type: "special",
        damage: 10,
      },
    ],
  },
  fetchedAt: false,
};

const Detail = ({ pokemon }: any) => {
  return (
    <>
      <section>
        <h2>
          {pokemon.name}
          <sup>{pokemon.number}</sup>
        </h2>
      </section>
      <section>
        <ul>
          {pokemon.attacks.special.map((attack:any) => (
            <li key={attack.name}>
              <label>{attack.name}</label>:
              <span>
                {attack.damage} <small>({attack.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <small>{pokemon.fetchedAt}</small>
    </>
  );
};

const PokemonInfo = () => {
  return (
    <div>
      <div className={"flex justify-between"}>
        <img src={"https://via.placeholder.com/150"} alt={mockData.name} />
      </div>
      <Detail pokemon={mockData} />
    </div>
  );
};
const App = () => {
  return (
    <div className="rounded bg-blue-50 p-6 relative">
      <div className="mr-6">Heading</div>
      <PokemonInfo />
    </div>
  );
};

export default App;
