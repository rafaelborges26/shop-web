import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const priceId = "price_1PfnoZBF2ue8IyNcT5apQBl0"
    const successUrl = `${process.env.NEXT_URL}/success`
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