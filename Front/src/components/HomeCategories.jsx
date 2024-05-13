import React from "react";
import useProducts from "../hooks/useProducts";

export default function HomeCategories() {
  const { handleProductsByIndumentaria, handleProductsByActivity } =
    useProducts();
  const categories = [
    {
      id: 1,
      image:
        "https://d2wxkzn4zrc8hy.cloudfront.net/home-categories/24abr-camperas.jpg",
      title: "Abrigos",
      value: "Abrigos",
    },
    {
      id: 2,
      image:
        "https://d2wxkzn4zrc8hy.cloudfront.net/home-categories/24abr-mochilas.jpg",
      title: "Mochilas",
      value: "Mochilas",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Zapatillas",
      value: "Zapatillas",
    },
    {
      id: 4,
      image:
        "https://media.istockphoto.com/id/1438058575/es/foto/chaquetas-multicolores-de-invierno-colgadas-en-perchas-en-el-primer-plano-de-la-tienda-vista.jpg?b=1&s=612x612&w=0&k=20&c=rxfQ_SKz8dTMWtXQgWWvEo0ENG93MsHETK6C6Gof6i0=",
      title: "Camperas",
      value: "Campera",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/7271269/pexels-photo-7271269.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Futbol",
      value: "Futbol",
    },
    {
      id: 6,
      image:
        "https://i.pinimg.com/236x/f9/18/7e/f9187e2d0ca57bb9db03958f6e16ae71.jpg",
      title: "Gorras",
      value: "Gorras",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-around w-full h-full my-10">
      {categories.map((category) => (
        <div
          key={category.id}
          className="h-56 sm:w-52 sm:h-72 w-40 m-2 sm:mx-3 relative overflow-hidden  cursor-pointer"
          onClick={() =>
            category.id === 5
              ? handleProductsByActivity(category.value)
              : handleProductsByIndumentaria(category.value)
          }
        >
          <div className="flex items-center justify-center hover:scale-110 w-full h-full z-10 relative duration-300">
            <img
              src={category.image}
              alt=""
              className="object-cover h-full w-full"
            />
            <h2 className="text-stroke text-2xl sm:text-3xl">
              {category.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
