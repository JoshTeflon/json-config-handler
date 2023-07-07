import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as monaco from 'monaco-editor'
import { toast } from 'react-toastify'
import { Button, Checkbox, EditorView, Input } from './components/interface'
import { defaultStr } from './data/default'

const DecisionModel: React.FC = () => {
  const [configName, setConfigName] = useState<string>('')
  const [configDesc, setConfigDesc] = useState<string>('')
  const [configValue, setConfigValue] = useState<string>(defaultStr)
  const [formData, setFormData] = useState<any>(JSON.parse(configValue));
  const [errors, setErrors] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const updatedConfigValue = JSON.stringify(formData, null, 2)
    setConfigValue(updatedConfigValue)
  }, [formData])

  useEffect(() => {
    if (location?.state) {
      const modelData = location?.state
      setConfigName(modelData?.name)
      setConfigDesc(modelData?.desc)
      setConfigValue(JSON.stringify(modelData?.rules, null, 2))
      setFormData(modelData?.rules)
    }
  }, [location.state])

  const handleEditorChange = (value: string | undefined) => {
    value && setConfigValue(value)
  }

  const handleEditorValidate = (markers: monaco.editor.IMarker[]) => {
    const hasErrors = markers.length > 0;
    setErrors(hasErrors);
  }

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    const updatedFormData = { ...formData }
    const keys = name.split('.')
    const lastKey: string | undefined = keys.pop()
    let currentObject = updatedFormData
    for (const key of keys) {
      if (!currentObject[key]) {
        currentObject[key] = {}
      }
      currentObject = currentObject[key]
    }

    lastKey && (currentObject[lastKey] = type === 'checkbox' ? checked : type === 'number' ? +value : value)

    setFormData(updatedFormData)
  };

  const handleUpdateConfig = async () => {
    setLoading(true)
    try {
      const updatedData = {
        name: configName,
        desc: configDesc,
        rules: formData
      }

      const response = await fetch(`https://64a7b757dca581464b84a3cd.mockapi.io/api/v1/models/${location?.state?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success('Decision Model updated successfully')
        navigate('/')
      } else {
        toast.error('Error updating decision model')
      }
      setLoading(false)
    } catch (error) {
      console.log('Error updating model:', error)
      toast.error(`Error: ${error}`)
      setLoading(false)
    }
  };

  const handleSaveConfig = async () => {
    setLoading(true)
    try {
      const newData = {
        name: configName,
        desc: configDesc,
        rules: formData
      }

      const response = await fetch('https://64a7b757dca581464b84a3cd.mockapi.io/api/v1/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        toast.success('Decision Model created successfully')
        navigate('/')
      } else {
        toast.error('Error creating decision model')
      }
      setLoading(false)
    } catch (error) {
      console.log('Error creating model:', error)
      toast.error(`Error: ${error}`)
      setLoading(false)
    }
  };

  const generateFormFields = () => {
    if (!configValue) {
      return null;
    }

    try {
      const jsonData = JSON.parse(configValue);

      return Object.keys(jsonData).map((key) => {
        const { provider, minimum, required, sequence, continue_on_failure } = jsonData[key];

        return (
          <div key={key}>
            <label
              style={{
                color: 'var(--primary-color)',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              {key}
            </label>
            {minimum !== undefined && (
              <div style={{ margin: '0.5rem 0' }}>
                <Input
                  label='Minimum'
                  type="number"
                  name={`${key}.minimum`}
                  value={formData?.[key]?.minimum || ''}
                  onChange={handleFieldChange}
                />
              </div>
            )}
            {provider !== undefined && (
              <div style={{ margin: '0.5rem 0' }}>
                <Input
                  label='Provider'
                  name={`${key}.provider`}
                  value={formData?.[key]?.provider || ''}
                  onChange={handleFieldChange}
                />
              </div>
            )}
            {required !== undefined && (
              <div style={{ margin: '0.5rem 0' }}>
                <Checkbox
                  label='Required'
                  name={`${key}.required`}
                  checked={formData?.[key]?.required || false}
                  onChange={handleFieldChange}
                />
              </div>
            )}
            {sequence !== undefined && (
              <div style={{ margin: '0.5rem 0' }}>
                <Input
                  label='Sequence'
                  type="number"
                  name={`${key}.sequence`}
                  value={formData?.[key]?.sequence || ''}
                  onChange={handleFieldChange}
                />
              </div>
            )}
            {continue_on_failure !== undefined && (
              <div style={{ margin: '0.5rem 0' }}>
                <Checkbox
                  label='Continue on Failure'
                  name={`${key}.continue_on_failure`}
                  checked={formData?.[key]?.continue_on_failure || false}
                  onChange={handleFieldChange}
                />
              </div>
            )}
          </div>
        );
      });
    } catch (error) {
      // Handle JSON parsing errors if needed
      return null;
    }
  }

  return (
    <div className='model-config'>
      <h2>Decision Model Configuration</h2>
      <p>Use the form interface to configure the decision model JSON view.</p>
      <div className='model-config__inputs'>
        <Input
          label='Name*'
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
        />
        <Input
          label='Description*'
          value={configDesc}
          onChange={(e) => setConfigDesc(e.target.value)}
        />
      </div>
      <div className='model-config__config'>
       <div className='model-config__config--wrapper'>
          <form className='model-config__form'>
            <h3>Form Interface*</h3>
            <div className='model-config__form--wrapper'>
              {generateFormFields()}
            </div>
          </form>
          <div className='model-config__editor'>
            <h3>JSON Viewer</h3>
            <div className='model-config__editor--wrapper'>
              <EditorView
                value={configValue}
                onChange={handleEditorChange}
                onValidate={handleEditorValidate}
                options={{ readOnly: true }}
              />
            </div>
          </div>
       </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {
            location?.state?.id ?
            <Button
              style={{ maxWidth: '12rem' }}
              onClick={handleUpdateConfig}
              disabled={errors || !configName || !configDesc}
              loading={loading}
            >Update</Button>
            :
            <Button
              style={{ maxWidth: '12rem' }}
              onClick={handleSaveConfig}
              disabled={errors || !configName || !configDesc}
              loading={loading}
            >Save</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default DecisionModel