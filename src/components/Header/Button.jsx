import React from 'react'

function Button({
    children,
    type = 'button',
    btnColor = 'bg-blue',
    txtColor = 'text-txtColor',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${btnColor} ${txtColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
