type Props = {
  name: string;
  category: string;
  price: string;
  location: string;
};

export default function ArtistCard({ name, category, price, location }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-xl font-bold text-pink-600">{name}</h3>
      <p>Category: {category}</p>
      <p>Price: {price}</p>
      <p>Location: {location}</p>
     <button
  onClick={() => alert(`Quote request sent for ${name}!`)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2 transition"
>
  Ask for Quote
</button>

    </div>
  );
}
