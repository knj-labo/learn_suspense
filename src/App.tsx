import "./styles/reset.css";
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
  fetchedAt: "2020-01-01T00:00:00.000Z",
};

function Detail({ pokemon }: any) {
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
          {pokemon.attacks.special.map((attack: any) => (
            <li key={attack.name}>
              <label>{attack.name}</label>:
              <span>
                {attack.damage} <small>({attack.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <small className="absolute right-3 top-3">{pokemon.fetchedAt}</small>
    </>
  );
}

function PokemonInfo() {
  return (
    <article className="rounded bg-white p-6 flex flex-col relative">
      <div className="flex justify-center w-full">
        <img src="https://via.placeholder.com/150" alt={mockData.name} />
      </div>
      <Detail pokemon={mockData} />
    </article>
  );
}
function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <PokemonInfo />
    </div>
  );
}

export default App;
