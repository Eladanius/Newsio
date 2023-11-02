'use client';

import { Settings2, Globe2, Building2, Heart } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { newsCategories, newsCountry, newsLanguages } from '@/constants/newsCategories';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { NewsOptions } from '../reducers/types';
import useAction from '@/lib/store/useAction';
import { useSelector } from 'react-redux';
import { selectNewsOptions } from '../reducers/newsOptions';
import { useGetNewsMutation } from '../reducers/newsApi';

let timeout: NodeJS.Timeout;
export default function Topbar() {
  const actions = useAction();
  const selectedOptions = useSelector(selectNewsOptions);
  const [_newsCategories, setNewsCategories] = useState(newsCategories);
  const [_newsCountry, setNewsCountry] = useState(newsCountry);
  const [_newsLanguages, setNewsLanguages] = useState(newsLanguages);
  const [getNews] = useGetNewsMutation({ fixedCacheKey: 'newsFeed' });
  // const [selectedOptions, setSelectedOptions] = useState<NewsOptions>({
  //   categories: [],
  //   countries: [],
  //   languages: [],
  // });

  function handleSearch(field: 'category' | 'country' | 'language', value: string) {
    value = value.toLowerCase();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (field === 'category')
        setNewsCategories(newsCategories.filter((el) => el.toLowerCase().includes(value)));
      else if (field === 'country')
        setNewsCountry(newsCountry.filter((el) => el.label.toLowerCase().includes(value)));
      else if (field === 'language')
        setNewsLanguages(newsLanguages.filter((el) => el.label.toLowerCase().includes(value)));
    }, 300);
  }

  function handleToggleCheckbox(
    field: 'categories' | 'countries' | 'languages',
    checked: boolean,
    value: string
  ) {
    actions.changeNewsOption({ field, action: checked ? 'add' : 'remove', value });
  }

  function handleApplyFilter() {
    getNews({ ...selectedOptions });
  }

  return (
    <>
      <div className='absolute top-2 left-2'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='sm' variant='outline'>
              <Settings2 />
              <p className=' ml-2 max-sm:hidden'>Personalize news</p>
            </Button>
          </SheetTrigger>
          <SheetContent side='top' className='max-h-96 overflow-scroll'>
            <div className='grid gap-4 px-6 py-4'>
              <div>
                <div className='flex justify-between gap-2 items-baseline mb-4'>
                  <h1 className='text-lg font-bold'>Categories</h1>
                  <Input
                    placeholder='Find category...'
                    className='h-7 w-60 max-sm: w-50'
                    onChange={(e) => handleSearch('category', e.target.value)}
                  />
                </div>
                <div className='grid grid-cols-4 max-md:grid-cols-2 items-center gap-4'>
                  {_newsCategories.map((category) => (
                    <div key={category} className='items-top flex space-x-2'>
                      <Checkbox
                        checked={selectedOptions.categories?.some(
                          (el) => el.toLowerCase() === category.toLowerCase()
                        )}
                        onCheckedChange={(e: boolean) => handleToggleCheckbox('categories', e, category)}
                      />
                      <div className='grid gap-1.5 leading-none'>
                        <label
                          htmlFor='terms1'
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                          {category}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className='my-4' />
              <div>
                <div className='flex justify-between gap-2 items-baseline mb-4'>
                  <h1 className='text-lg font-bold'>Countries</h1>
                  <Input
                    placeholder='Find countries...'
                    className='h-7 w-60 max-sm: w-50'
                    onChange={(e) => handleSearch('country', e.target.value)}
                  />
                </div>
                <div className='grid grid-cols-4 max-md:grid-cols-2 items-center gap-4'>
                  {_newsCountry.map((country) => (
                    <div key={country.value} className='items-top flex space-x-2'>
                      <Checkbox
                        checked={selectedOptions.countries?.some(
                          (el) => el.toLowerCase() === country.value.toLowerCase()
                        )}
                        onCheckedChange={(e: boolean) => handleToggleCheckbox('countries', e, country.value)}
                      />
                      <div className='grid gap-1.5 leading-none'>
                        <label
                          htmlFor='terms1'
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                          {country.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter className='sticky bottom-0 items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm'>
              <Button size='sm' className='w-fit' onClick={handleApplyFilter}>
                Apply
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {/* <div className='absolute top-2 right-2'>
        <Button size='sm' variant='outline'>
          <Globe2 /> <p className='ml-2 max-sm:hidden'>News Language</p>
        </Button>
      </div> */}
    </>
  );
}
