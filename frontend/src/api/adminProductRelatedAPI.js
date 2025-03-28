import { API } from "./axios";

export const getProducts = async () => {
  const response = await API.get("/product/getProducts?limit=10&page=1");
  return response.data;
};
export const newProduct = async (formData) => {
  const response = await API.post("/product/newProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const updateProduct = async (productId, formData) => {
  console.log(formData);
  const response = await API.put(
    `/product/updateProduct/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const deleteProduct = async (productId) => {
  const response = await API.delete(`/product/deleteProduct/${productId}`)
  return response.data  
};
