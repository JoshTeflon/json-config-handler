import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classnames from 'classnames'
import b from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    variant?: 'primary' | 'naked' | 'link'
    type?: 'submit' | 'reset' | 'button'
    loading?: boolean
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, className, variant = 'primary', type = 'button', loading, disabled, ...rest } = props

    return (
        <button
            className={classnames(b.root, className,
                {
                  [b.primary]: variant === 'primary',
                  [b.naked]: variant === 'naked',
                  [b.link]: variant === 'link'
                }
            )}
            type={type}
            disabled={loading || disabled}
            {...rest}
        >
            {loading ? <span>Loading...</span> : children}
        </button>
    )
}

export default Button;