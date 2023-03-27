import React, { useState } from "react";

const StepTwo = ({
  activeStep,
  setActiveStep,
  register,
  serviceProgList,
  watch,
  setValue,
}) => {
  const [selectValue, setSelectValue] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div className="maintenance-radio">
        <div>
          <h4>Add vehicle Without service</h4>
          <label
            htmlFor="service-program"
            className="d-flex justify-content-between"
            onClick={() => {
              setChecked(false);
              setValue("vehicle.maintenance.serviceProgram", null);
            }}
          >
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id="service-program"
                className="mr-2"
                checked={!checked}
              />
              None
            </div>
            <span className="">No Service Reminder will be created</span>
          </label>
        </div>
        <div>
          <h4>Choose a Service</h4>
          <label
            htmlFor="vehicle-name"
            onClick={() => {
              setChecked(true);
              setValue("vehicle.maintenance.serviceProgram", selectValue);
            }}
          >
            <input
              type="radio"
              value={selectValue}
              checked={checked}
              id="vehicle-name"
            />
            <select
              disabled={!checked}
              defaultValue={selectValue}
              className="form-control"
              onChange={(e) => {
                setSelectValue(e.target.value);
                setValue("vehicle.maintenance.serviceProgram", e.target.value);
              }}
            >
              {[
                {
                  _id: '',

                  name: 'please select a service program',
                  disabled: true,
                },
                ...serviceProgList,
              ].map((v) => (
                <option key={v._id} value={v._id} disabled={v.disabled}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-end w-100">
        <button
          type="button"
          className="btn btn-outline-primary px-5 btn-md mx-2"
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          back
        </button>
        <button
          type="button"
          className="btn btn-primary px-5 btn-md"
          onClick={() => setActiveStep((prev) => prev + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
