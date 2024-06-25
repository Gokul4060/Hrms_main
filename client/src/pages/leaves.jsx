import React, {useState} from 'react'

import Tabs from "../components/leaveTab"

const leaves = () => {

    const [leaveRecords, setLeaveRecords] = useState([]);

    const addLeaveRecord = (record) => {
      setLeaveRecords([...leaveRecords, record]);
    };

  return (
    <div className="mt-1">
      <Tabs
        leaveRecords={leaveRecords}
        addLeaveRecord={addLeaveRecord}
        className="w-full"
      />
    </div>
  );
}

export default leaves
