import { SelectOption, Selector } from './Selector';
import { breeds } from './breeds';

export const fetchBreeds = async () => {
  const data = await fetch('https://api.thedogapi.com/v1/breeds');
  const breeds = await data.json();
  return mapBreedsToSelectOptions(breeds);
};

const mapBreedsToSelectOptions = (breeds: any) =>
  breeds.map((breed: any) => ({
    label: breed.name,
    value: breed.temperament
  })) as SelectOption[];

function App() {
  return (
    <div className="App">
      <Selector
        id="breed-selector"
        placeholder="Velg hunderase"
        selectorLabel="Hunderase"
        fetchOptions={fetchBreeds}
      />
      <div style={{ marginTop: '100px' }}>
        <p>Select with pre-assigned data</p>

        <Selector
          id="breed-selector-2"
          placeholder="Velg hunderase"
          selectorLabel="Hunderase"
          prefetchedOptions={mapBreedsToSelectOptions(breeds)}
        />
      </div>
    </div>
  );
}

export default App;
