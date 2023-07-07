import React, { InputHTMLAttributes } from 'react'
import classnames from 'classnames'
import { Check } from '../../icons'
import c from './Checkbox.module.css'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  checked?: boolean
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { className, checked, label, onChange, ...rest } = props

  const rootClassName = classnames(c.root, {}, className)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    return null
  }

  return (
    <label className={c.label}>
      <input
        className={c.input}
        checked={checked}
        onChange={handleOnChange}
        type="checkbox"
        {...rest}
      />
      <span className={c.labelText}>{label}</span>
      <span className={rootClassName}>
        <Check
          className={c.checkIcon}
          fill="none"
          stroke="#ffffff"
          width={14}
          height={14}
        />
      </span>
    </label>
  )
}

export default Checkbox