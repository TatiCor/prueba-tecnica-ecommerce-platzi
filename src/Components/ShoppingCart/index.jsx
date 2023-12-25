import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const ShoppingCart = () => {
    const context = useContext(ShoppingCartContext)

    return(
        <div className='flex items-center'>
            <ShoppingBagIcon className='h-6 w-6 text-black'></ShoppingBagIcon>
            <div>{context.cartProducts.length}</div>
        </div>
    )
}

export default ShoppingCart
