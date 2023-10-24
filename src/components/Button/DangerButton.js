import React from 'react'
import styles from './DangerButton.module.css'

const DangerButton = ({onClick, text}) => {
  return (
    <div>
         <div className={styles.formButton} onClick={onClick}>
        <span> {text} </span>
    </div>
    </div>
  )
}

export default DangerButton