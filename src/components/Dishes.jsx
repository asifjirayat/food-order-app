import Dish from "./Dish.jsx";
import dishes from "../../temp-dishes.js";

const Dishes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </div>
  );
};

export default Dishes;
