const Subscription = require('../model/subscription');

const createSubscription = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      const err = new Error('Email is required');
      err.statusCode = 400;
      return next(err);
    }

    const existingSubscription = await Subscription.findOne({ email: email.toLowerCase().trim() });
    if (existingSubscription) {
      const err = new Error('This email is already subscribed.');
      err.statusCode = 409;
      return next(err);
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    res.status(201).json({ message: 'Successfully subscribed! Thank you.' });
  } catch (error) {
    console.error('Error in createSubscription:', error.message);
    next(error);
  }
};

module.exports = {
  createSubscription
};