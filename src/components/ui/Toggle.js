import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { Field } from 'mobx-react-form';

@observer
export default class Toggle extends Component {
  static propTypes = {
    field: PropTypes.instanceOf(Field).isRequired,
    className: PropTypes.string,
    showLabel: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    showLabel: true,
  };

  onChange(e) {
    const { field } = this.props;

    field.onChange(e);
  }

  render() {
    const {
      field,
      className,
      showLabel,
    } = this.props;

    if (field.value === '' && field.default !== '') {
      field.value = field.default;
    }

    return (
      <div
        className={classnames([
          'franz-form__field',
          'franz-form__toggle-wrapper',
          className,
        ])}
      >
        <label
          htmlFor={field.id}
          className={classnames({
            'franz-form__toggle': true,
            'is-active': field.value,
          })}
        >
          <div className="franz-form__toggle-button" />
          <input
            type="checkbox"
            id={field.id}
            name={field.name}
            value={field.name}
            checked={field.value}
            onChange={e => this.onChange(e)}
          />
        </label>
        {field.error && <div className={field.error}>{field.error}</div>}
        {field.label && showLabel && <label className="franz-form__label" htmlFor={field.id}>{field.label}</label>}
      </div>
    );
  }
}
