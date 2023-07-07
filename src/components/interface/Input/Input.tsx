import React, { InputHTMLAttributes, ReactNode, forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import classnames from 'classnames'
import i from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string | ReactNode
  placeholder?: string
  type?: string
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  const {
    className,
    label,
    placeholder,
    value,
    onChange,
    type = 'text',
    ...rest
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    return null
  }

  return (
    <label className={i.label}>
      {label && <span>{label}:</span>}
        <input
            className={classnames(i.root, className)}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
            type={type}
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            ref={mergeRefs([ref, inputRef])}
            {...rest}
        />
    </label>
  )
})

export default Input
