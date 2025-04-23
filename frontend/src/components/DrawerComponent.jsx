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

export function DrawerComponent() {
  return (
    <DrawerContent className="w-[400px]"> 
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>Review your selected items.</DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <img
              src="https://example.com/sample-image.jpg"
              alt="Product"
              className="w-16 h-16 rounded-md"
            />
            <div className="flex-1 ml-4">
              <div className="font-bold">Sample Product</div>
              <div className="text-sm text-gray-500">Size: M</div>
              <div className="text-lg font-semibold">₹999</div>
              
              {/* Quantity Controls */}
              <div className="flex items-center mt-2 space-x-2">
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">1</span>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button size="icon" variant="ghost">
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹999</span>
          </div>
        </div>

        {/* Footer with Checkout Button */}
        <DrawerFooter>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Checkout (₹999)
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  )
}