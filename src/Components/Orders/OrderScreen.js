import '../../Styles/Orders.css'
import OrderBox from './OrderBox';

export default function OrderScreen(props) {

    return (
        <div>
            {props.orders.map(order => {
                <OrderBox order={order} />
            })}
        </div>
    )
}
