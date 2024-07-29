import { stripe } from "@/lib/stripe";
import { ContainerSuccess, ContainerImage } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    customerName: string
    product: { 
        name: string, 
        imageUrl: string
    }
}

export default function Success({ customerName, product }: SuccessProps ) {
    return (
        <>
            <Head>
              <title>Compra efetuada | Ignite Shop</title>

              <meta name="robots" content="noindex" />
            </Head>

            <ContainerSuccess>
                <h1>Compra efetuada!</h1>

                <ContainerImage>
                    <Image src={product.imageUrl} height={120} width={110} alt="" />
                </ContainerImage>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho de sua casa.
                </p>

                <Link href='/'>Voltar ao catálogo</Link>
            </ContainerSuccess>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionId = query.session_id?.toString()

    if(!sessionId){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'] //obter do produto
    })

    const customerName = session.customer_details?.name
    const product = session?.line_items?.data[0]?.price?.product as Stripe.Product

    console.log(session, 'session')

    console.log(customerName, 'customerName')

    console.log(product, 'product')

    
    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0] || ''
            }
        }
    }
}