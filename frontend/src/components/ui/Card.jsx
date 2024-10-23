import React from 'react'
import classNames from 'classnames'
import { twMerge } from "tailwind-merge"

const Card = React.forwardRef(({className, children}, ref) => {
    const compClass = classNames({
        "bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800":true
    })
  return (
    <div ref={ref} className={twMerge(compClass, className)}>{children}</div>
  )
})

export default Card