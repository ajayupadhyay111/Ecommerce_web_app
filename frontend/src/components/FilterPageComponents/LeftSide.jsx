import React, { useEffect, useState, useCallback, memo } from "react";
import { filterItems } from "@/constant";

const LeftSide = memo(({ setCheckedBox, searchValue }) => {
  const [open, setOpen] = useState(["Categories"]);
  const [selectedItem, setSelectedItem] = useState([searchValue]);

  // Memoize handlers
  const handleCheckboxes = useCallback((subItem) => {
    setSelectedItem((prev) =>
      prev.includes(subItem)
        ? prev.filter((title) => title !== subItem)
        : [...prev, subItem]
    );
  }, []);

  const handleAccordionToggle = useCallback((itemTitle) => {
    setOpen((prev) =>
      prev.includes(itemTitle)
        ? prev.filter((title) => title !== itemTitle)
        : [...prev, itemTitle]
    );
  }, []);

  // Update parent only when selectedItem changes
  useEffect(() => {
    setCheckedBox(selectedItem);
  }, [selectedItem, setCheckedBox]);
  return (
    <div className="absolute left-0 top-0 w-[250px] h-full bg-neutral-500/15">
      <ul className="overflow-y-auto h-full">
        {filterItems.map((item, idx) => (
          <li key={item.title || idx} className="">
            <div
              className="flex justify-between border-t-2 border-gray-800/50 py-3 px-2"
              onClick={() => handleAccordionToggle(item.title)}
            >
              <span>{item.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 ease-in-out"
              >
                <path
                  d="M12 5v14"
                  className={`transition-all origin-center duration-300 ease-in-out ${
                    open.includes(item.title) ? "rotate-0" : "-rotate-90"
                  }`}
                />
                <path d="M5 12h14" />
              </svg>
            </div>
            <ul
              className={`flex flex-col gap-2 px-4 ${
                open.includes(item.title)
                  ? "h-fit overflow-auto"
                  : "h-0 overflow-hidden transition-all"
              } transition-all duration-300 ease-in-out`}
            >
              {item?.categories?.map((subItem) => (
                <li key={subItem} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedItem.includes(subItem)}
                    onChange={() => handleCheckboxes(subItem)}
                  />
                  <span>{subItem}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
});

// Add display name for debugging
LeftSide.displayName = 'LeftSide';

export default LeftSide;