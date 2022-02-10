import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let loadedData = [];
    const fetchApi = async () => {
      const response = await fetch("https://restaurantmenu-cf1f8-default-rtdb.firebaseio.com/meals.json");
      if (!response.ok) {
        throw new Error("something went wrong!!");
      }
      const responseData = await response.json();
      for (const key in responseData) {
        loadedData.push({
          key: key,
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedData);
    };

    fetchApi().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.isLoadingss}>Loading....</p>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <p className={classes.errorMessage}>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
