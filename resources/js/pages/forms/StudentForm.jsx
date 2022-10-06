import React, { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function StudentForm(props) {
  const [formData, setData] = useState(props.data);

  const addData = (elem) => {
    setData((previousSate) => {
      const obj = previousSate;
      obj[elem.name] = elem.value;
      return { ...obj };
    });
  };

  useEffect(() => {
    if (props.data) setData(props.data);
  });

  const submitStudent = () => {
    props.finalsubmit(formData);
  };

  return (
    <Wizard>
      <Step1 data={formData} change={(elem) => addData(elem)} />
      <Step2 data={formData} change={(elem) => addData(elem)} />
      <Step3
        data={formData}
        change={(elem) => addData(elem)}
        create={submitStudent}
        type={props.type}
      />
    </Wizard>
  );
}

export default StudentForm;
