import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/interface'
import { Delete, Edit } from './components/icons'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='home'>
        <h2>Decision Models</h2>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            style={{ maxWidth: '12rem' }}
            onClick={() => navigate('/decision-model')}
          >Add Decision Model</Button>
        </div>
        <div className='decision__container'>
          <div className='decision__container--item'>
            <div>
              <h3 style={{ margin: '0 0 1rem 0' }}>First Decision Model</h3>
              <p style={{ margin: '0' }}>First decision model description.</p>
            </div>
            <div className='decision__container--btns'>
              <Button
                variant='naked'
              ><Edit /></Button>
              <Button
                variant='naked'
              ><Delete /></Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home