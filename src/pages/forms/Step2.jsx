import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import apiService from "../../services/apiService";

function Step2(props) {
  const { previousStep, nextStep } = useWizard();
  const [country, setCountry] = useState(false);
  const [state, setState] = useState(false);
  const [city, setCity] = useState(false);
  // const [header, setHeader] = useState({});
  const header = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhdmFkaC5wYW50aGVyY29keEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiIxVmpQS1hWaC1BM2xYdjJaYmNqUFFfODRyZjhJNFJLMHp1dVQ2bmF5T1hoTlZaNWNLUmlLc21BT2d3aklfaGZDWUx3In0sImV4cCI6MTY0NzMxNjYzN30.FlU6fzanKJE0N_w5PfcFqHWRoTp-OiYfp4DUJ6fVB5A",
    },
  };

  useEffect(() => {
    // apiService
    //   .genterateToken({
    //     headers: {
    //       "api-token":
    //         "1VjPKXVh-A3lXv2ZbcjPQ_84rf8I4RK0zuuT6nayOXhNVZ5cKRiKsmAOgwjI_hfCYLw",
    //       "user-email": "avadh.panthercodx@gmail.com",
    //     },
    //   })
    //   .then((res) =>
    //     setHeader({
    //       headers: {
    //         Authorization: "Bearer " + res.auth_token,
    //       },
    //     })
    //   );
    apiService.getCountry(header).then((res) => setCountry(res));

    if (props.data.state)
      apiService
        .getStates(header, props.data.country)
        .then((res) => setState(res));

    if (props.data.city)
      apiService
        .getCities(header, props.data.state)
        .then((res) => setCity(res));
  }, []);

  const apiStates = (elem) => {
    if (elem.value == "select") return false;
    apiService.getStates(header, elem.value).then((res) => setState(res));
    props.change(elem);
  };

  const apiCity = (elem) => {
    if (elem.value == "select") return false;
    apiService.getCities(header, elem.value).then((res) => setCity(res));
    props.change(elem);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="card card-primary">
      <div className="card-header" style={{ borderRadius: "0" }}>
        <h3 className="card-title">Residential Details</h3>
      </div>

      <form onSubmit={handleSubmit(nextStep)}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="country">Country :</label>
            <select
              className="form-control select2"
              name="country"
              id="country"
              value={props.data.country ? props.data.country : ""}
              {...register("country", { required: true })}
              onChange={(e) => apiStates(e.target)}
            >
              <option>select</option>
              {country &&
                country.map((elem, i) => (
                  <option key={i}> {elem.country_name} </option>
                ))}
            </select>
          </div>
          {errors?.country && (
            <p className="text-danger"> Please enter country </p>
          )}
          <div className="form-group">
            <label htmlFor="state">State :</label>
            <select
              className="form-control select2"
              name="state"
              id="state"
              value={props.data.state ? props.data.state : ""}
              {...register("state", { required: true })}
              onChange={(e) => apiCity(e.target)}
            >
              <option>select</option>
              {state &&
                state.map((elem, i) => (
                  <option key={i}> {elem.state_name} </option>
                ))}
            </select>
          </div>
          {errors?.state && <p className="text-danger"> Please enter state </p>}
          <div className="form-group">
            <label htmlFor="city">City :</label>
            <select
              className="form-control select2"
              name="city"
              id="city"
              value={props.data.city ? props.data.city : ""}
              {...register("city", { required: true })}
              onChange={(e) => props.change(e.target)}
            >
              <option>select</option>
              {city &&
                city.map((elem, i) => (
                  <option key={i}> {elem.city_name} </option>
                ))}
            </select>
          </div>
          {errors?.country && (
            <p className="text-danger"> Please enter country </p>
          )}
          <div className="form-group">
            <label htmlFor="address">Address :</label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
              defaultValue={props.data.address ? props.data.address : ""}
              placeholder="Enter address"
              {...register("address", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.address && (
            <p className="text-danger"> Please enter address </p>
          )}
        </div>

        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => previousStep()}>
            Previous
          </button>{" "}
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step2;
