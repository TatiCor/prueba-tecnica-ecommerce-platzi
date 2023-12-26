import { useNavigate } from 'react-router-dom'
import { useState, useContext, useRef} from "react"
import { ShoppingCartContext } from '../../Context'
import { EyeIcon} from '@heroicons/react/24/outline'
import { EyeSlashIcon} from '@heroicons/react/24/outline'
import Layout from '../../Components/Layout'


function MyAccount() {
  const context = useContext(ShoppingCartContext)  
  const [view, setView] = useState('user-info')
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  const formRef = useRef(null)
  const navigate = useNavigate();

  const validatePasswords = () => {
    const formData = new FormData(formRef.current);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    return password === confirmPassword;
  }

  const editAccount = () => {
    const passwordsMatch = validatePasswords();

    const formData = new FormData(formRef.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    // Update account
    if (passwordsMatch) {
      const stringifiedAccount = JSON.stringify(data)
      localStorage.setItem('account', stringifiedAccount)
      context.setAccount(data)   
      setView('user-info')
    } else {
      setPasswordsMatchError(true)
      setTimeout(() => {
        setPasswordsMatchError(false)
      }, 5000);
    }    
  }

  const cancelEdit = () => {
    setView('user-info');
    navigate('/my-account');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderUserInfo = () => {
        return(
          <div className='flex flex-col p-4 m-2 w-full'>
            <span className='flex flex-col p-2 m-4'>
              <div className='flex mb-1'>
                <p className='mb-1 text-md font-bold '>Name: </p>
                <p className='mx-2'>{parsedAccount?.name}</p>
              </div>
              <div className='flex mb-1'>
                <p className='mb-1 text-md font-bold'>Email: </p>
                <p className='mx-2'>{parsedAccount?.email}</p>
              </div>
              <div className='flex mb-1'>
                <p className='mb-1 text-md font-bold'>Password: </p>
                <div className='w-[150px] flex items-center '>
                  { showPassword ? (
                    <p className='mx-2'>{parsedAccount?.password}</p>) : (
                    <p className='mx-2'>{'*'.repeat(parsedAccount?.password?.length || 0)}</p>
                  )}
                </div>
                { showPassword ? (
                  <EyeIcon className='ml-2 h-6 w-6 cursor-pointer' onClick={togglePasswordVisibility} />
                ) : (
                  <EyeSlashIcon className='ml-2 h-6 w-6 cursor-pointer' onClick={togglePasswordVisibility} />
                )}
              </div>

            </span>
            <button 
              className='bg-black text-white rounded-md font-bold  my-4 p-2 cursor-pointer hover:shadow-md'
              onClick={() => setView('edit-user-info')}>Edit account</button>
        </div>
        )
      
  } 

  const renderEditUserInfo = () => {
    return(
      <form 
        ref={formRef}
        className='flex flex-col p-4 m-4 w-full'>
        <label className='mb-1 text-sm font-bold'>Name</label>
        <input 
          id='name'
          name='name'
          type='text'
          className='p-1 mb-2 text-md rounded-md'
          placeholder='Name'
          
        />
        <label className='mb-1 text-sm font-bold'>Email</label>
        <input
          id='email'
          name='email'
          type="email"
          placeholder='username@example.com'
          className='p-1 mb-2 text-md rounded-md'
          
        />
        <label className='mb-1 text-sm text-gray-500 font-bold'>New password</label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='******'
          className='p-1 mb-2 text-md  rounded-md'
        />
        
        <label className='mb-1 text-sm text-gray-500 font-bold'>Confirm new password</label>
        <input
          id='confirm-password'
          name='confirm-password'
          type='password'
          placeholder='******'
          className='p-1 mb-2 text-md  rounded-md'          
        />
        {passwordsMatchError && (
          <p className='text-red-500 text-sm mb-2'>Las contraseñas no coinciden.</p>
        )}
        
        <div className='flex w-full justify-center m-2'> 
          <button 
            type="button" 
            className='bg-green-200 rounded-md py-2 px-4 m-4 font-bold w-24 cursor-pointer hover:shadow-md'
            onClick={() => {editAccount()}}>Confirm</button>
          <button 
            type="button"
            className='border rounded-md py-2 px-4 m-4 font-bold w-24 cursor-pointer hover:shadow-md'
            onClick={() => { cancelEdit() }}>Cancel
          </button>
        </div>
        

  </form>
    )
    
  }

  const renderView = () => {
    return view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo();
  }
  
  return (
    <Layout>
      <h1 className='font-medium text-xl'>My account</h1>
      <div className='flex flex-col justify-center items-center m-4 py-4 w-96 rounded-md shadow-md'>
        {renderView()}
      </div>
    </Layout>
  )
}

export default MyAccount


