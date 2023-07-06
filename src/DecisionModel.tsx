import React from 'react'
import { Input } from './components/interface'

const DecisionModel: React.FC = () => {
  return (
    <div className='model-config'>
      <h2>Decision Model Config</h2>
      <div className='model-config-inputs'>
        <Input
          label='Name'
        />
        <Input
          label='Description'
        />
      </div>
    </div>
  )
}

export default DecisionModel