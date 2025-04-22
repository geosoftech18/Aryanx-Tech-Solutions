import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <section className="bg-transparent text-white  relative ">
      <Image alt="" width={1600} height={900} src={"/jobFilter.png"}  
      className="absolute bg-cover -z-10"
      />
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center z-10 px-28 py-10">
        <div className="space-y-4 col-span-1">
          <Card className="bg-blue-100 text-blue-900 max-w-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-1">
                Your 2025 Salary Guide is here!
              </h2>
              <p className="text-sm">
                Secure the best talent in the market with the latest salary data
                and hiring insights in your sector.
              </p>
              <a
                href="#"
                className="text-blue-700 underline text-sm font-medium mt-2 inline-block"
              >
                Get your free guide
              </a>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1"></div>

        <div className="relative z-10 col-span-2">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

const SearchForm = () => {
  return (
    <Card className="shadow-xl rounded-2xl p-4">
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3 items-center">
          <Input placeholder="Job title" className="col-span-1" />
          <Input placeholder="Region, city..." className="col-span-1" />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Salary min" />
            </SelectTrigger>
            <SelectContent>
              {salaryOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Salary max" />
            </SelectTrigger>
            <SelectContent>
              {salaryOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="bg-blue-700 text-white hover:bg-blue-800 w-full md:w-auto"
          >
            Search
          </Button>
        </form>
        <div className="flex flex-wrap justify-between text-sm mt-4 gap-2 relative">
          {browseOptions.map((option) => (
            // <Dropdown key={option.label} label={option.label} options={option.options} />
            <DropdownMenu key={option.label}>
              <DropdownMenuTrigger>{option.label}</DropdownMenuTrigger>
              <DropdownMenuContent className=" grid grid-cols-2">
                {option.options.map((item) => (
                  <DropdownMenuItem
                    key={item}
                    className="p-2 cursor-pointer border m-2 rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500"
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            // <Accordion type="single" collapsible>
            //   <AccordionItem value="item-1">
            //     <AccordionTrigger>{option.label}</AccordionTrigger>
            //     <AccordionContent className="w-full flex items-between justify-between">
            //       {option.options.map((item) => (
            //         <div>{item}</div>
            //       ))}
            //     </AccordionContent>
            //   </AccordionItem>
            // </Accordion>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// const Dropdown = ({ label, options }) => {
//   return (
//     <div className="relative group ">
//       <button className="text-blue-100 hover:underline focus:outline-none">
//         {label} <span className="ml-1">▼</span>
//       </button>
//       <div className="absolute left-0 hidden group-hover:block bg-white text-black mt-2 rounded-md shadow-lg z-20 min-w-[200px]">
//         <ul className="p-2">
//           {options.map((option, idx) => (
//             <li
//               key={idx}
//               className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const salaryOptions = [
  "20k",
  "30k",
  "40k",
  "50k",
  "60k",
  "70k",
  "80k",
  "90k",
  "100k+",
];

const browseOptions = [
  {
    label: "Browse jobs by Industry",
    options: ["Technology", "Finance", "Healthcare", "Education"],
  },
  {
    label: "Browse jobs by Sector",
    options: ["Public", "Private", "Non-Profit"],
  },
  {
    label: "Browse jobs by Location",
    options: ["New York", "London", "Berlin", "Tokyo"],
  },
  {
    label: "Browse by job title",
    options: ["Software Engineer", "Project Manager", "Designer"],
  },
];

export default HeroBanner;
