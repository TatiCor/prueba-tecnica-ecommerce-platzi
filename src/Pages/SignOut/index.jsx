import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { useContext, useState, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'

function SignOut() {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const [view, setView] = useState('user-info')
  const formRef = useRef(null)

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  const hasAnAccount = !!parsedAccount && Object.keys(parsedAccount).length > 0

  const createAnAccount = () => {
    const formData = new FormData(formRef.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    if (!parsedAccount || data.email !== parsedAccount.email || data.password !== parsedAccount.password) {
      context.setAccount(data)
      localStorage.setItem('account', JSON.stringify(data))
      handleLogIn()
    } else {
      console.log('Ya existe una cuenta con estos datos.')
    }
  }

  const handleLogIn = () => {
    if (hasAnAccount) {
      localStorage.setItem('sign-out', JSON.stringify(false))
      context.setSignOut(false)
      navigate('/')
    }
  }

  const renderLogIn = () => {
    return (
      <div className='flex flex-col justify-center items-center m-4 py-4 w-96 rounded-md shadow-md'>
        <form className='flex flex-col p-4 m-4 w-full'>
          <label className='mb-1 text-sm'>Email</label>
          <input
            type="text"
            placeholder='username@example.com'
            className='p-1 mb-2 text-md rounded-md'
            defaultValue={parsedAccount?.email || ''}
          />
          <label className='mb-1 text-sm text-gray-500'>Password</label>
          <input
            type="password"
            placeholder='******'
            className='p-1 mb-2 text-md  rounded-md'
            defaultValue={parsedAccount?.password || ''}
          />

          <div className='flex flex-col w-full'>
            <Link to="/" className='flex justify-center '>
              <button
                className='bg-black text-white w-full  my-4 p-2 rounded-md font-bold'
                disabled={!hasAnAccount}
                onClick={handleLogIn}
              >
                Log-in
              </button>
            </Link>
            <span className='flex justify-center p-2'>
              <p className=' text-sm text-gray-400 hover:underline cursor-pointer '>Forgot my password</p>
            </span>
            <Link className='flex justify-center '>
              <button
                className='w-full my-4 p-2 rounded-md bg-gray-200 font-bold'
                disabled={hasAnAccount}
                onClick={() => setView('create-user-info')}
              >
                Sign-up
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }

  const renderCreateUser = () => {
    return (
      <form
        ref={formRef}
        className='flex flex-col  p-6 m-6 w-96 rounded-md shadow-md'>
        <span className='flex justify-center items-center mb-4 font-bold'><p>Let's create your account!</p></span>
        <label className='mb-1 text-sm'>Your full name:</label>
        <input
          id='name'
          type='text'
          placeholder='Denise Ross'
          name='name'
          className='p-1 mb-2 pl-1 text-md rounded-md'
        />
        <label className='mb-1 text-sm'>Your email</label>
        <input
          id='email'
          type="email"
          placeholder='denise@example.com'
          name='email'
          className='p-1 mb-2 pl-1 text-md rounded-md'
        />
        <label className='mb-1 text-sm'>Your password</label>
        <input
          id='password'
          type='password'
          placeholder='******'
          name='password'
          className='p-1 mb-2 pl-1 text-md rounded-md'
        />
        <Link to="/">
          <button
            onClick={createAnAccount}
            className='bg-black text-white w-full  my-4 p-2 rounded-md font-bold'>
            Create account
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUser() : renderLogIn()

  return (
    <Layout>
      <h1 className=" text-md font-bold mb-4">Welcome!</h1>
      {renderView()}
    </Layout>
  )
}

export default SignOut
