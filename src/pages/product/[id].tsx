import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"

interface ProductProps {
    product: {
      id: string,
      name: string
      imageUrl: string
      price: string
      description: string
      defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()

    if(isFallback){
        return <p>loading</p>
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
            </ImageContainer>
            <ProductDetails>
                <h1>{ product.name }</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>
                <button onClick={() => console.log(product, 'product')} >Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    //buscar produtos mais vendidos ou mais acessados

    return {
        paths: [
            { params: { id: 'prod_QWrV7jx7nHskE4' } }
        ],
        fallback: true //para isso se n existir o id nos params por baixo dos panos ele vai buscar pelo id enqanto o html da página já está executando para isso é bom adicionar um loading
        
    }   
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const productId = params?.id?.toString() || '123' //obtendo o id da url
    
    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'] //fazer relacionamento
    })

    const price = product.default_price as Stripe.Price //para trazer o unique_amount
    
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount ? 
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                .format(price.unit_amount / 100) // dividido por 100 para obter em centavos
                : 0,
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 //1 hous
        
    }
}