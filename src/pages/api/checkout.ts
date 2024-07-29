import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { priceId } = req.body

    if(req.method !== 'POST'){
        res.status(405).json({ error: 'Method not allowed' })
    }

    if(!priceId) {
        res.status(400).json({ error: 'Price not found.' })
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/success`

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl, //onde redirecionar o user após a compra
        cancel_url: cancelUrl, //onde redirecionar o user após cancelar a compra
        mode: 'payment',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ]
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url //url para o usuário finalizar a compra.
    })
}