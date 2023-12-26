import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import OrdersCard from '../../Components/OrdersCard';
import { FaceFrownIcon } from '@heroicons/react/24/outline'


function MyOrders() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error parsing orders:', error);
      }
    }
  }, []);

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>My Orders</h1>
      </div>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              currentDate={order.date}
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts} />
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center h-40">
          <FaceFrownIcon className='h-6 w-6 text-gray-500 '/>
          <p className="text-gray-500 text-lg ml-1">You don't have any orders yet</p>
        </div>
      )}
    </Layout>
  );
}

export default MyOrders;
