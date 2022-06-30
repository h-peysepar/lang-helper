import React, { ReactNode } from 'react'

function ErrorMessage(props: {children: ReactNode}) {
     const { children } = props
     return (
          <span className={`text-red-700 mt-2 text-xs text-center w-full block ${!children && 'invisible'}`}>{children}!</span>
     )
}

export default ErrorMessage
