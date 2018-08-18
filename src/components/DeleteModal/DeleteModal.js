import React from 'react'
import './DeleteModal.css';

export default function deleteModal() {
  return (

<div className='deletecheckframe'>
<div className='cancel'><i class="fas fa-times-circle"/></div>
    <div className='deletecheck'>
      <h2> Are you sure? </h2>
      <button> <i className="far fa-trash-alt"/> &thinsp; Delete </button>
    </div>
</div>

  )
}
