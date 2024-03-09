import React from 'react'
import style from './index.module.scss'
export default function cssModule() {
  return (
    <div className={style['bg-red']}>cssModule</div>
  )
}
