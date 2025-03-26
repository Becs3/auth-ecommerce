import { ChangeEvent, useState } from "react";

type searchCategoryProps = {
  searchCategory: (category: string) => void;
  categories: string[]
}

const CategorySearch = ({ searchCategory, categories }: searchCategoryProps) => {
  const [search, setSearch] = useState(""); 

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
    const category = e.currentTarget.value;

    setSearch(category)
    searchCategory(category);
  }

  return (
    <div>
        <p>Filter by category:</p>
        <select value={search} onChange={handleChange}>
            <option value="">All Products</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    </div>
);
}

export default CategorySearch;
