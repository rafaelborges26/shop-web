import { styled } from "@/styles";
import { useKeenSlider,  } from 'keen-slider/react'
import Image from "next/image";
import { HomeContainer, Product } from "@/styles/pages/home";
import camisa1 from '../assets/camisas/1.png'
import camisa2 from '../assets/camisas/2.png'
import camisa3 from '../assets/camisas/3.png'

import 'keen-slider/keen-slider.min.css'


export default function Home() {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camisa1} width={520} height={400} alt="camisa 1" />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,00</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa2} width={520} height={400} alt="camisa 2"/>
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,00</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={400} alt="camisa 2"/>
        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 79,00</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={400} alt="camisa 2"/>
        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 79,00</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
