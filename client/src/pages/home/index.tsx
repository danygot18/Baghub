import React from 'react'
import Carousel from './carousel'
import Product from './product';

export default function Home() {
  const images = [
    "/images/Celine.png",
    "images/Chanel.png",
    "/images/Fendi.png",
    "/images/Hermes.png",
    "/images/Prada.png"
  ]
  const apiBase = import.meta.env.VITE_API;
  console.log(apiBase);
  return (
    <div className='min-h-screen flex flex-col m-24 content start items-center'>
      <Carousel images={images} />

      <Product />

    </div>
  )
}
