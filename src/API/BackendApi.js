export const restaurantMenu = async () => {
  console.log("%c apicall", "background: green;padding: 2px");
  const response = await fetch("https://restaurantmenu-cf1f8-default-rtdb.firebaseio.com/meals.json", {
    headers: "application/json",
  });
  const data = await response.json();
  console.log("%c data", "background: green;padding: 2px", data);
};
