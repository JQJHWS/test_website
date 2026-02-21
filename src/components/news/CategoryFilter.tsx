import React from 'react';
import { getCategoryName } from '../../data/categories';
import { NewsCategory } from '../../types';

interface CategoryFilterProps {
  categories: NewsCategory[];
  selectedCategories: NewsCategory[];
  onCategoryChange: (categories: NewsCategory[]) => void;
  showAll?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  showAll = true
}) => {
  const handleCategoryClick = (categoryId: NewsCategory) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(c => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {showAll && (
        <button
          onClick={handleClearAll}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategories.length === 0
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全部
        </button>
      )}
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategories.includes(category)
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {getCategoryName(category)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
