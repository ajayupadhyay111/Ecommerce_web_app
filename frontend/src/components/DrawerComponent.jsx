import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductToCart, updateProductQuantity } from "@/store/features/cart/cartSlice"
import { getProductById } from "@/api/UserRelatedAPI"


export function DrawerComponent() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState([])
  const deleteItemFromCart = (id,size)=>{
    dispatch(deleteProductToCart({id,size}))
  }

  const updateQuantity = (itemId, size, type) => {
    // Add this function to your cart slice
    dispatch(updateProductQuantity({ id: itemId, size, type }));
  };
  const {items,totalProductQuantity} = useSelector(state=>state.cart)
  React.useEffect(()=>{
    (async()=>{
      const response = await getCartPorducts(items)
      console.log(response)
    })()
  },[totalProductQuantity])
  return (
     <DrawerContent className="w-[400px]"> 
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>{totalProductQuantity.length > 0 ?"Review your selected items.":"Cart is empty"} </DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-16 h-16 rounded-md"
              />
              <div className="flex-1 ml-4">
                <div className="font-bold">{item.name}</div>
                <div className="text-sm text-gray-500">Size: {item.sizes}</div>
                <div className="text-lg font-semibold">₹{item.price}</div>
                
                {/* Quantity Controls */}
                <div className="flex items-center mt-2 space-x-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item._id, item.sizes, 'decrease')}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" /> 
                  </Button>
                  <span className="w-8 text-center">{item.quantity || 1}</span>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item._id, item.sizes, 'increase')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => deleteItemFromCart(item._id, item.sizes)}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)}</span>
          </div>
        </div>

        {/* Footer with Checkout Button */}
        <DrawerFooter>
          <Button 
            className={`w-full bg-green-500 hover:bg-green-600 `}
            disabled={cartItems.length === 0}
          >
            Checkout (₹{cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)})
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  )
}
