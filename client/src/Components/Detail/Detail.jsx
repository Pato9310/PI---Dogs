import { useSelector } from "react-redux";

const DetailBreed = () => {
  const detail = useSelector((state) => state.detail);
  return (
    <div>
      {detail.map((dog) => {
        return (
          <div key={dog.id}>
            <img src={dog.image} alt={dog.image}></img>
            <p>{dog.name}</p>
            <p>{dog.temperament}</p>
            <p>{dog.min__height}</p>
            <p>{dog.max__height}</p>
            <p>{dog.min__weight}</p>
            <p>{dog.max__weight}</p>
            <p>{dog.life_span}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DetailBreed;
