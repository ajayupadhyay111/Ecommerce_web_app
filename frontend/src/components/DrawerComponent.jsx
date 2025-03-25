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
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductToCart } from "@/store/features/cart/cartSlice"


// const cartItems = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/100", // Replace with product image
//     name: "Product 1",
//     size: "M",
//     price: "$20",
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/100",
//     name: "Product 2",
//     size: "L",
//     price: "$35",
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/100",
//     name: "Product 3",
//     size: "S",
//     price: "$15",
//   },
// ]

export function DrawerComponent() {
  const cartItems = useSelector(state=>state.cart.items)
  const dispatch = useDispatch();
  const deleteItemFromCart = (id,size)=>{
    dispatch(deleteProductToCart({id,size}))
  }
  return (
    
      <DrawerContent className="w-[400px]"> 
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>Review your selected items.</DrawerDescription>
          </DrawerHeader>

          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md"
                />
                <div className="flex-1 ml-4">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-gray-500">Size: {item.size}</div>
                  <div className="text-lg font-semibold">{item.price}</div>
                </div>
                <Button size="icon" variant="ghost" onClick={()=>deleteItemFromCart(item.id,item.size)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Footer with Checkout Button */}
          <DrawerFooter>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Checkout
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
  )
}
