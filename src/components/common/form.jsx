import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import AreaInput from "./areaInput";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return this.state.disabled || null;
    const errors = {};
    for (let detail of error.details) errors[detail.path[0]] = detail.message;
    console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors, apiError: null });
  };

  renderValidatedButton(label) {
    return (
      <button
        name={label}
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderCancelButton(label) {
    return (
      <button
        name={label}
        className="btn btn-seconday"
        onClick={this.handleCancel}
      >
        {label}
      </button>
    );
  }

  renderResetButton(label) {
    return (
      <button
        name={label}
        className="btn btn-seconday"
        onClick={this.handleReset}
      >
        {label}
      </button>
    );
  }

  renderInput(
    name,
    label,
    autofocus = "",
    type = "text",
    disabled = "",
    max = "",
    min = ""
  ) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        autoFocus={autofocus}
        error={errors[name]}
        disabled={disabled}
        max={max}
        min={min}
      />
    );
  }

  renderAreaInput(name, label, rows = 8, autofocus = "", disabled = "") {
    const { data, errors } = this.state;
    return (
      <AreaInput
        name={name}
        label={label}
        value={data[name]}
        rows={rows}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
        autoFocus={autofocus}
      />
    );
  }

  renderSelect(name, label, options, disabled) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
      />
    );
  }

  //   renderSelectByValueOption(name, label, options, valueOption, disabled) {
  //     const { data, errors } = this.state;
  //     return (
  //       <SelectByValueOption
  //         name={name}
  //         value={data[name]}
  //         label={label}
  //         options={options}
  //         onChange={this.handleChange}
  //         error={errors[name]}
  //         disabled={disabled}
  //         valueOption={valueOption}
  //       />
  //     );
  //   }

  //   renderConditionalSelect(name, label, options, condition, disabled) {
  //     const { data, errors } = this.state;
  //     return (
  //       <ConditionalSelect
  //         name={name}
  //         value={data[name]}
  //         label={label}
  //         options={options}
  //         onChange={this.handleChange}
  //         error={errors[name]}
  //         condition={condition}
  //         disabled={disabled}
  //       />
  //     );
  //   }

  //   renderMultiSelect(multiSelect) {
  //     const ms = multiSelect.map((m) => (
  //       <div className="form-group" key={m.name}>
  //         <label htmlFor={m.name}>{m.label}</label>
  //         <select name={m.name} className="form-control">
  //           <option />
  //           {m.options.map((o) => (
  //             <option key={o.name} value={o.name}>
  //               {o.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     ));
  //     return ms;
  //   }

  //   renderDatePicker() {
  //     return <DatePicker onSelect={this.handleDateSelect} />;
  //   }

  //   renderDateTimePicker(selectedDateTime, onChange) {
  //     return (
  //       <DateTimePicker
  //         onSelect={this.handleDateSelect}
  //         selected={selectedDateTime}
  //         onChange={onChange}
  //       />
  //     );
  //   }
}

export default Form;
