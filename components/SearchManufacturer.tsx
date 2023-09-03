"use client";

import Image from 'next/image';
import {useState, Fragment} from 'react';
import { SearchManufacturerProps } from '@/types'
import { manufacturers } from '@/constants';
import { Combobox, Transition } from '@headlessui/react'

const SearchManufactuer = ({manufacturer,
   setManufacturer}: SearchManufacturerProps ) => {
    const [query, setQuery] = useState('');

    //if query is + empty sting = return all manufacturers
    const filteredManufacturers = query === " " ?
    manufacturers : manufacturers.filter((item) => (
      item.toLowerCase()
      //replace all empty space with an empty string
      .replace(/\s+/g, "")
      //check if the search query include lowercase
      .includes(query.toLowerCase().replace(/\s+/g, ""))
    ))

  return (
    <div className='search-manufacturer'>
      {/* pass data to pull searched cars below
      the state within the SearchBar is being updated */}
      <Combobox
      value = { manufacturer}
      onChange={setManufacturer}>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px]'>
            <Image
            src='/car-logo.svg'
            width={20}
            height={20}
            className='ml-4'
            alt='Car Logo'
             />
          </Combobox.Button>
          <Combobox.Input
          className='search-manufacturer__input'
          placeholder='Volkswagen'
          //callback function that gets the value and displays the value
          displayValue={(manufacturer: string) =>
          manufacturer}
          onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredManufacturers.map((item) =>(
                  <Combobox.Option
                  key={item}
                  className={({active}) => `
                  relative search-manufacturer__option
                  ${ active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                  `}
                  value={item}
                  >
                    
                  </Combobox.Option>
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>

      </Combobox>
      </div>
  )
}

export default SearchManufactuer