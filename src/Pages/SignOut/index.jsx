import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { useContext, useState } from 'react'
import { ShoppingCartContext, initializeLocalStorage } from '../../Context'
/* Tengo que hacer una vista que se renderice conforme si tengo un username creado o no. Si lo hay muestro log-in else sign-up */

function SignOut() {
  const context = useContext(ShoppingCartContext)
  
    // creo estado para renderizar vistas
    const [view, setView] = useState('user-info')

  //traigo Account de localStorage
  const account = localStorage.getItem('account')
  console.log("LocalStorage: ", account);

  const parsedAccount = JSON.parse(account)
  console.log("LocalStorage parsed: ",parsedAccount);

  // verifico si el usuario tiene cuenta Has an account
  const hasNotAccountLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const hasNotAccountLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasAnAccount = !hasNotAccountLocalStorage && !hasNotAccountLocalState

  // crear visto log-ig
  const renderLogIn = ()=> {
    return(
      <div className='flex flex-col justify-center items-center m-4 py-4 w-96 rounded-md shadow-md'>

        <form className='flex flex-col p-4 m-4 w-full'>
          <label className='mb-1 text-sm'>Username</label>
          <input 
            type="text"
            placeholder='username@example.com'
            className='p-1 mb-2 text-md rounded-md'
            defaultValue={parsedAccount?.account}
          />
          <label className='mb-1 text-sm text-gray-500'>Password</label>
          <input 
            type="password"
            placeholder='******'
            className='p-1 mb-2 text-md  rounded-md'
            defaultValue={parsedAccount?.password}
          />

          <div className='flex flex-col w-full'>
          <Link className='flex justify-center '>
            <button 
              className='bg-black text-white w-full  my-4 p-2 rounded-md font-bold'
              disabled={!hasAnAccount}>Log-in</button>
          </Link>
          <span className='flex justify-center p-2'>
            <p className=' text-sm text-gray-400 hover:underline cursor-pointer '>Forgot my password</p>
          </span>
          <Link
            className='flex justify-center '>
            <button 
              className='w-full my-4 p-2 rounded-md bg-gray-200 font-bold'
              disabled={hasAnAccount}
              onClick={() => setView('create-user-info')}
            >Sign-up</button>
          </Link>
          </div>
        </form>
      </div>
    )
  }

  const renderCreateUser = () => {
    return(
      <form className='flex flex-col  p-6 m-6 w-96 rounded-md shadow-md'>
          <label className='mb-1 text-sm'>Your name:</label>
          <input 
            type="text"
            placeholder='Denise Ross'
            className='p-1 mb-2 pl-1 text-md rounded-md'
          />
          <label className='mb-1 text-sm'>Your email</label>
          <input 
            type="email"
            placeholder='denise@example.com'
            className='p-1 mb-2 pl-1 text-md rounded-md'
          />
          <label className='mb-1 text-sm'>Your password</label>
          <input 
            type="password" 
            placeholder='******'
            className='p-1 mb-2 pl-1 text-md rounded-md'
          />
          <button className='bg-black text-white w-full  my-4 p-2 rounded-md font-bold'>Create account</button>{/* poner una funcion para cuando hace click agregar cuenta */}
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