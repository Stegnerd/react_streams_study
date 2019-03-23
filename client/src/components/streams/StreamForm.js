import React from "react";
import { Field, reduxForm } from "redux-form";

// redux fields require these props name= name of the property you pass in, not the name of the field
class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // this is turned into an arrow function so we keep context of this
  renderInput = ({ input, label, meta }) => {
    // ... adds all the form props to each input
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// error object properties need to match names of the field components
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    // only ran if use didn't not enter a title
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({ form: "streamForm", validate: validate })(
  StreamForm
);
