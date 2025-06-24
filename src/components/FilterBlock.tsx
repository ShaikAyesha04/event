type Props = {
  onFilterChange: (filters: { category: string; location: string; price: string }) => void;
};

export default function FilterBlock({ onFilterChange }: Props) {
  return (
    <div className="flex gap-4 flex-wrap ">
      <select className="text-white bg-gray-800 border border-gray-500 rounded px-3 py-2"
  defaultValue="" onChange={(e) => onFilterChange({ category: e.target.value, location: "", price: "" })}>
       <option value="" disabled>
    Select Category
  </option>
        <option value="Singer">Singer</option>
        <option value="Dancer">Dancer</option>
        <option value="DJ">DJ</option>
        <option value="Speaker">Speaker</option>
      </select>
    </div>
  );
}
