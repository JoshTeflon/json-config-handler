import { useNavigate } from 'react-router-dom'
import { Button } from '../interface'
import { Icon } from '../icons'

const Header = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Button
                variant='naked'
                onClick={() => navigate('/')}
            ><Icon /></Button>
        </div>
    )
}

export default Header