'use client';
import { useState } from 'react';
import {TabsComponentProps} from "@/app/utils/interfaces"

const TabsComponent: React.FC<TabsComponentProps> = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="text-sm font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {items.map((item, index) => (
          <li key={index} className="me-2">
            <button
              onClick={() => !item.disabled && setSelectedTab(index)}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                item.disabled
                  ? 'text-gray-400 cursor-not-allowed dark:text-gray-500'
                  : selectedTab === index
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              disabled={item.disabled}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4">
        {items[selectedTab]?.content || <p>No content available.</p>}
      </div>
    </div>
  );
};

export default TabsComponent;
