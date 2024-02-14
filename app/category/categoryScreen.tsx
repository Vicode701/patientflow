import { FC, useContext, useState } from 'react';
import { DEFAULT_TEMPERATURE } from '@/utils/app/const';
import CategoryItem from './categoryItem';
import CategoryDetailsScreen from './categoryDetailsScreen';
import { categoryItemData } from './categoryItemData';

import {
    IconChevronsRight,
    IconChevronLeft,
    IconSearch
  } from '@tabler/icons-react';

interface Props {
  label: string;
  onChangeTemperature: (temperature: number) => void;
}

export const CategoryScreen: FC<Props> = ({ label, onChangeTemperature }) => {
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [more, setMore] = useState(false);
  const [isMoreButton, setIsMoreButton] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  

  const handleMoreClick = (category: string) => {
    // console.log(selectedCategory);
    // console.log(category);
    setIsMoreButton(false);

    setSelectedCategory(category);
  }

  let categoryData = categoryItemData.find((category) => category.id === selectedCategory);

  console.log(categoryData);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    onChangeTemperature(newValue);
  };


// Example component for detailed information about a category
interface CategoryDetailsProps {
    categoryName: string;
  }
  
  const CategoryDetails: FC<CategoryDetailsProps> = ({ categoryName }) => {
    // You can fetch and display more detailed information here
    return (
        <>
            <div className="relative overflow-auto flex-1  bg-white">
            <div className="flex items-center justify-start px-10 pb-2 border-b  border-gray-200">
                  <div className=" flex items-center text-base text-black  mt-2">
                <button onClick={() => {setSelectedCategory(''); setIsMoreButton(true)}}
              className="hover:text-gray-300 h-6 text-sm font-bold mr-2">
                <IconChevronLeft  color='#EC5A7B'/>

            </button>
                   <span>All Templates / {selectedCategory}</span> 
                  </div>
                </div>

        <div className=" border-t border-white/20 p-10 grid grid-cols-12 grid-rows-2 gap-12 text-sm">
       
        <CategoryDetailsScreen categoryData={categoryData} />
  
     


        <div className='col-span-12  intro-y font-bold'>
     <p className='text-gray-600 mb-4'>importanrt consideration while using templates</p>
       <div
         className={`card p-6 rounded-md shadow-md md:transform md:scale-125}`}
       >
         <p className="text-gray-600 mb-4 italic font-bold ">
             
         Templates mostly serve as a guide, and do not always capture all components 
 of the particular diagnosis. It is the responsibility of the Clinician to ensure all other
 important perspectives and information about a case, work up and management 
 plan included are properly documented. 
         
         </p>
        
       </div>
     </div>
        </div>
     
</div>
    
     </>

    
    );
  };


  return (
    <>
                <div className="relative overflow-auto flex-1  bg-white">

    <div className='flex items-end justify-between px-10 pb-2 border-b  border-gray-200'>

        <div className=' text-base text-black'>
            Case Templates
        </div>

   
     <div className="pt-2 relative  text-gray-600">
        <input className="border-2 border-[#F3F0F0] bg-[#F3F0F0] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"/>
        <button type="submit" className="absolute right-2 top-4 ">
          {/* <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg> */}
          <IconSearch  color='#EC5A7B'/>
        </button>
      </div>
    </div>
    
    {!selectedCategory && (
        <div className=" border-t border-white/20 p-10 grid grid-cols-12 grid-rows-2 gap-12 text-sm">
        {/* <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
          {label}
        </label> */}
{categoryItemData.map((data, index) => <CategoryItem key={index} categoryData={data} buttonClick = {handleMoreClick} isMore ={isMoreButton}/>)}

  
        {/* <div className="col-span-4">
          <label className=" text-left text-black font-bold ">Cardiology</label>
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
            <li>Unstable Angina/NSTEMI</li>
            <li>

            <Link  href={`/category/Acute HFrEF`}>
            Acute HFrEF
    </Link>
            </li>
            
            <li>Chest Pain r/o ACS</li>
            <li>Atrial Fibrillation with RVR</li>
            <li>Symptomatic Bradycardia</li>
          </ul>
          <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
              onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name
          >
            More Cardiology
            
          </button>
        </div> */}

  
        
  
      
  
        <div className="col-span-4">
          <label className=" text-left text-black font-bold ">
          Nephrology
          </label>
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
            <li>Acute Kidney Injury</li>
            <li>Hypernatremia</li>
            <li>Hyponatremia </li>
            <li>Hyperkalemia</li>
            <li>High Anion Gap Met Acidosis</li>
          </ul>
          <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
                        onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name

          >
            More Nephrology
          </button>
        </div>
  
        <div className="col-span-4">
          <label className=" text-left text-black font-bold ">
          Infectious Disease         
          </label>
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
            <li>Urinary tract Infection </li>
            <li>Cellulitis </li>
            <li>Acute Osteomyelitis  </li>
            <li>Infectious Endocarditis </li>
            <li>Meningitis </li>
          </ul>
          <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
         onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name

          >
            More Nephrology
          </button>
        </div>
  
       
  
        {!more ? ( <div className="col-span-4 relative ">
         
         
         <button className=" absolute bottom-0 flex justify-center items-center  bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
                 onClick={() => setMore(true)}
  
         >
           <span>More Category </span>
           <IconChevronsRight size={18} />
           
  
         </button>
       </div>) : (
          <>
          <div className="col-span-4">
          <label className=" text-left text-black font-bold ">
          Infectious Disease         
          </label>
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
            <li>Urinary tract Infection </li>
            <li>Cellulitis </li>
            <li>Acute Osteomyelitis  </li>
            <li>Infectious Endocarditis </li>
            <li>Meningitis </li>
          </ul>
          <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
                        onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name
          >
            More Nephrology
          </button>
        </div>
  
  <div className="col-span-4">
  <label className=" text-left text-black font-bold ">
  Infectious Disease         
  </label>
  <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
    <li>Urinary tract Infection </li>
    <li>Cellulitis </li>
    <li>Acute Osteomyelitis  </li>
    <li>Infectious Endocarditis </li>
    <li>Meningitis </li>
  </ul>
  <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
                onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name

  >
    More Nephrology
  </button>
  </div>
  
  <div className="col-span-4">
          <label className=" text-left text-black font-bold ">
          Infectious Disease         
          </label>
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
            <li>Urinary tract Infection </li>
            <li>Cellulitis </li>
            <li>Acute Osteomyelitis  </li>
            <li>Infectious Endocarditis </li>
            <li>Meningitis </li>
          </ul>
          <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
                        onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name

          >
            More Nephrology
          </button>
        </div>
  
        <div className="col-span-4">
          <label className=" text-left text-black font-bold ">
          Infectious Disease         
          </label>
          <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
            <li>Urinary tract Infection </li>
            <li>Cellulitis </li>
            <li>Acute Osteomyelitis  </li>
            <li>Infectious Endocarditis </li>
            <li>Meningitis </li>
          </ul>
          <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded"
                        onClick={() => handleMoreClick('Cardiology')} // Call handleMoreClick with the category name

          >
            More Nephrology
          </button>
        </div>
        </>
        )}
  
  
      <div className='col-span-12  intro-y font-bold'>
      <p className='text-gray-600 mb-4'>importanrt consideration while using templates</p>
        <div
          className={`card p-6 rounded-md shadow-md md:transform md:scale-125}`}
        >
          <p className="text-gray-600 mb-4 italic font-bold ">
              
          Templates mostly serve as a guide, and do not always capture all components 
  of the particular diagnosis. It is the responsibility of the Clinician to ensure all other
  important perspectives and information about a case, work up and management 
  plan included are properly documented. 
          
          </p>
         
        </div>
      </div>
      </div>
    )}
   
</div>

{selectedCategory && (
        <div className="col-span-12">
          <div className="mb-4">
          
            <CategoryDetails categoryName={selectedCategory} />
          </div>
        </div>
      )}
    </>
  );
};
