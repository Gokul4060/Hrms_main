import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import Tab1 from "./leaveTabs/Tab1";
import Tab2 from "./leaveTabs/Tab2";
import Tab3 from "./leaveTabs/Tab3";

export default function Tabs({ leaveRecords, }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <TabList className="bg-gray-100 rounded-2xl w-full space-x-5">
        {[""].map((tabName, index) => (
          <Tab key={index} as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  selected && "bg-blue-500 text-white rounded-3xl p-2"
                )}
              >
                {tabName}
              </button>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Tab1 leaveRecords={leaveRecords} />
        </TabPanel>
        <TabPanel>
          <Tab2 />
        </TabPanel>
        <TabPanel>
          <Tab3 />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
