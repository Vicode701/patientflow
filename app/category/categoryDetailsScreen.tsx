import Link from 'next/link';

interface CategoryItemProps {
    categoryData: any
//   categoryData: {
//     catTitle: string;
//     categories?: Array<{ id: string; val: string }> | undefined;
//     id?: string;
//   };
}

const CategoryDetailsScreen: React.FC<CategoryItemProps> = ({ categoryData }) => {
  const maxRowsPerColumn = 5;

  const renderCategories = (categories: Array<{ id: string; val: string }> | undefined) => {
    if (!categories) return null;

    const columns: JSX.Element[] = [];

    for (let i = 0; i < Math.ceil(categories.length / maxRowsPerColumn); i++) {
      const startIdx = i * maxRowsPerColumn;
      const endIdx = startIdx + maxRowsPerColumn;
      const columnCategories = categories.slice(startIdx, endIdx);

      columns.push(
        
        <div key={i} className="flex-col mr-8">
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside">
            {columnCategories.map((category, index) => (
              <li key={index}>
                <Link href={`/category/${category.id}`}>{category.val}</Link>
              </li>
            ))}
          </ul>
        </div>
       
      );
    }

    return <div className="flex">{columns}</div>;
  };

  return (
    <div className="mt-4 col-span-8">
      <div className="flex">{renderCategories(categoryData.categories)}</div>
    </div>
  );
};

export default CategoryDetailsScreen;
