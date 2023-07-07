import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/interface'
import { Delete, Edit } from './components/icons'
import { toast } from 'react-toastify'

const Home: React.FC = () => {
  const [models, setModels] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  const fetchModels = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://64a7b757dca581464b84a3cd.mockapi.io/api/v1/models');
      const data = await response.json();
      data && setModels(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(`Error: ${error}`)
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])



  return (
    <div className='home'>
        <h2>Decision Models</h2>
        <p>List of all decision models created.</p>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            style={{ maxWidth: '12rem' }}
            onClick={() => navigate('/decision-model')}
          >Add Decision Model</Button>
        </div>
        <div className='decision__container'>
          {
            (models?.length > 0 && !loading) && models?.map((i: any) => {
              return (
                <div
                  className='decision__container--item'
                  key={i.id}
                >
                  <div>
                    <h3 style={{ margin: '0 0 1rem 0' }}>{i.name}</h3>
                    <p style={{ margin: '0' }}>{i.desc}</p>
                  </div>
                  <div className='decision__container--btns'>
                    <Button
                      variant='naked'
                      onClick={() => navigate('/decision-model', { state: i})}
                    ><Edit /></Button>
                    <Button
                      variant='naked'
                    ><Delete /></Button>
                  </div>
                </div>
              )
            })
          }
          {
            ((!models || models?.length <= 0) && !loading) &&
            <div style={{
              color: '#f82525',
              fontSize: '1rem',
              textAlign: 'center'
            }}>
              No models found! You can try adding a new decision model
            </div>
          }
          {
            loading &&
            <div style={{ textAlign: 'center', fontSize: '1rem' }}>Loading...</div>
          }
        </div>
    </div>
  )
}

export default Home