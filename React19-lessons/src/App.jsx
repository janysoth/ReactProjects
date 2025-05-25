import Greeting from "./components/Greeting";
import ProductInfo from "./components/ProductInfo";

const App = () => {
  const usersInfo = [
    {
      name: "Jonny Vorn Soth",
      email: "janysoth@gmail.com",
      location: "Austin, MN",
    },

    {
      name: "Saominea Soth",
      email: "saomineasoth@gmail.com",
      location: "Austin, MN",
    },

    {
      name: "Manikka Soth",
      email: "manikkasoth@gmail.com",
      location: "Austin, MN",
    },

    {
      name: "Samantta Soth",
      email: "samanttasoth@gmail.com",
      location: "Austin, MN",
    },

    {
      name: "Jaccika Soth",
      email: "jaccikasoth@gmail.com",
      location: "Austin, MN",
    },
  ];

  return (
    <div>
      <Greeting />
      <ProductInfo />

      {usersInfo.map(({ name, email, location, index }) => (
        <ul key={index}>
          <li>Name: {name}</li>
          <li>Email: {email}</li>
          <li>Location: {location}</li>
        </ul>
      ))}
    </div>
  );
};

export default App;