const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.stripPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};
