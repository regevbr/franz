import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {Form} from 'mobx-react-form';
import classnames from 'classnames';

@observer
export default class MultiInput extends Component {
  static propTypes = {
    form: PropTypes.instanceOf(Form).isRequired,
    placeHolders: PropTypes.arrayOf(PropTypes.string).isRequired,
    parts: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    label: null,
  };

  onChange(e, field) {
    field.onChange(e);
    let currError = false;
    const {placeHolders, form} = this.props;
    placeHolders.forEach((placeholder) => {
      const placeHolderKey = (`placeholder_${placeholder}`);
      currError = currError || form.$(placeHolderKey).error;
    });
    this.error = currError;
  }

  error = false;
  inputElement = null;

  focus() {
    this.inputElement.focus();
  }

  render() {
    const {
      form,
      placeHolders,
      parts,
      label,
    } = this.props;

    var rows = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part) {
        rows.push(<span className="franz-form__input-suffix">{part}</span>);
      }
      const placeholder = placeHolders[i];
      if (placeholder) {
        const placeHolderKey = (`placeholder_${placeholder}`);
        const field = form.$(placeHolderKey);
        rows.push(<input
          id={field.id}
          type={field.type}
          className="franz-form__input"
          name={field.name}
          value={field.value}
          placeholder={field.placeholder}
          onChange={e => this.onChange(e, field)}
          onBlur={field.onBlur}
          onFocus={field.onFocus}
          ref={(element) => {
            this.inputElement = element;
          }}
        />);
      }
    }

    return (
      <div
        className={classnames({
          'franz-form__field': true,
          'has-error': this.error,
        })}
      >
        <div className="franz-form__input-wrapper">
          {rows}
        </div>
        {label && (
          <label
            className="franz-form__label"
            htmlFor={label}
          >
            {label}
          </label>
        )}
        {this.error && (
          <div
            className="franz-form__error"
          >
            {this.error}
          </div>
        )}
      </div>
    );
  }
}
