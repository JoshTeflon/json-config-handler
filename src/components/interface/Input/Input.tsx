import React, { InputHTMLAttributes, ReactNode, forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string | ReactNode
  placeholder?: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  const {
    className,
    label,
    placeholder,
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
    <label>
      {label && <span>{label}</span>}
        <input
            className={className}
            placeholder={placeholder}
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
