import React from 'react'

const DropdownIcon = ({direction=true, size='16', ...props }) => {
  return (
    
    <svg width={size} height={size} {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    transform={direction === false ? "rotate(0)" : "rotate(180)"}
    >

<path fillRule="evenodd" clipRule="evenodd" d="M12.291 6.70743C12.9214 6.07759 12.4754 5 11.5842 5H4.41268C3.52199 5 3.07572 6.07669 3.70525 6.70679L7.28781 10.2926C7.67815 10.6833 8.31132 10.6836 8.70202 10.2932L12.291 6.70743Z" fill="#AAB4BF"/>
</svg>


    
  )
}

export default DropdownIcon