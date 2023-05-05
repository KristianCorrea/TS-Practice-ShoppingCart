import { Offcanvas, OffcanvasTitle, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}:ShoppingCartProps){
    const {closeCart, cartItems, cartQuantity} = useShoppingCart()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <OffcanvasTitle>Cart</OffcanvasTitle>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartQuantity<1?(<h1>Cart Empty</h1>):
                    <Stack gap={3}>
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}
                        <div className="ms-auto fw-bold fs-5">
                            Total{" "}
                            {formatCurrency(cartItems.reduce((total,cartItem)=>{
                                const item = storeItems.find(i => i.id===cartItem.id)
                                return total + (item?.price||0)*cartItem.quantity
                            },0))}
                        </div>
                    </Stack>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}