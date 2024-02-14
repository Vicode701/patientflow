'use client';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryItemProps {
  buttonClick: (data: string) => void,
  isMore: boolean,
  categoryData: {
    catTitle?: string;
    categories?: Array<{ id: string; val: string }>;
    id?: string;
  };
  
}
// interface CategoryItemProps {
//     categoryData: { catTitle: string; categories?: string[]; }; // Updated type
// }

  const CategoryItem: React.FC<CategoryItemProps> = ({buttonClick, categoryData, isMore }) => {
    const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll
    ? categoryData.categories
    : categoryData.categories?.slice(0, 5);
    
   const handleButtonClick = () => {
    setShowAll(!showAll)
    buttonClick(categoryData.id || '');
   }
    
    return (
    <div className="col-span-4">
    <>
      <label className="text-left text-black font-bold ">{categoryData.catTitle}</label>
      <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside">
        {visibleCategories?.map((category, index) => (
          <li key={index}>
          <Link  href={`/category/${category.id}`}>
          {category.val}

          </Link>
          </li>
        ))}
      </ul>
      {isMore && <button
        className="mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
          // onClick={handleButtonClick} // Call handleMoreClick with the category name
          onClick={ handleButtonClick}

      >
        {/* More {categoryData.catTitle} */}
        {showAll ? `Less ${categoryData.catTitle}` : `More ${categoryData.catTitle}`}

      </button>}
    </>
  </div>
  );
};

export default CategoryItem;
