'use client';
import React from 'react';
import TabsComponent from './Tabs'; // Adjust the path if needed
import {TapHolderProps} from "@/app/utils/interfaces"
import SectionJson from '../sections/SectionJson';
import SectionItems from '../sections/SectionItems';
const Tabs = ({
    content,
    finished,
  }: TapHolderProps) => {
  const tabs = [
    { title: 'JSON', content: <SectionJson finished={finished} content={content}>
        <p>invoice.json</p>
    </SectionJson> 
    }/*,
    { title: 'Structured data', content: <SectionItems finished={finished} content={content}>
      invoice.json
     </SectionItems>
    },*/
  ];

  return (
      <TabsComponent items={tabs} />
  );
};

export default Tabs;
