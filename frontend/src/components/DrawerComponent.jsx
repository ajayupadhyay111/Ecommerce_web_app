import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function DrawerComponent({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { cartProduct, totalProductsPrice } = useSelector(
    (state) => state.cart
  );

  const deleteProductFromCart = (id) => {
    console.log(id);
  };
  return (
    <DrawerContent className="w-[400px] overflow-y-auto overflow-x-hidden">
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto h-full w-full"
      >
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>Review your selected items.</DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        {cartProduct.length > 0
          ? cartProduct.map((product) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/product/${product.productId._id}`, {
                      state: {
                        size: product.size,
                        quantities: product.quantity,
                      },
                    });
                  }}
                  key={product.productId._id}
                  className="p-4 space-y-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div
                      className="flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <img
                        src={product.productId.images[0].url}
                        alt={product.productId.name}
                        className="w-16 h-16 rounded-md"
                      />
                      <div className="flex-1 ml-4">
                        <div className="font-bold">
                          {product.productId.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Size: {product.size}
                        </div>
                        <div className="text-sm text-gray-500">
                          Price:{" "}
                          <span className="font-medium">
                            ₹{product.productId.price}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Quantity:{" "}
                          <span className="font-medium">
                            {product.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        deleteProductFromCart(product.productId._id)
                      }
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              );
            })
          : "No product added to cart"}

        {/* Cart Summary */}
        <div className="px-4 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">₹{totalProductsPrice}</span>
          </div>{" "}
          <div className="flex justify-between">
            <span>Sheeping Charge:</span>
            <span className="font-semibold">Free</span>
          </div>
        </div>

        {/* Footer with Checkout Button */}
        <DrawerFooter>
          <Button className="w-full bg-green-500 hover:bg-green-600 ">
            Checkout ₹{totalProductsPrice}
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          {/* <DrawerClose asChild>
          </DrawerClose> */}
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
