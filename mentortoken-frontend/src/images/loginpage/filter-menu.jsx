import React from 'react'

const FiltersManu = ({
    direction = true,
    width = '24',
    height = '24',
    fill = 'white',
    borderRadius = '12',
    ...props
  }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6 8C6 7.44772 6.44772 7 7 7H17C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H7C6.44772 9 6 8.55228 6 8ZM8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12ZM10 16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16C14 16.5523 13.5523 17 13 17H11C10.4477 17 10 16.5523 10 16Z" fill="rgba(86, 106, 127, 1)"/>
</svg>

  )
}

export default FiltersManu