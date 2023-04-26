const ReviewModel = require("../Model/Review.model");

exports.getAllReviewController = async (req, res) => {
  try {
    const result = await ReviewModel.find({}).sort({ $natural: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postReviewController = async (req, res) => {
  try {
    const newReview = new ReviewModel(req.body);
    const result = await newReview.save();
    res.status(200).json({message: "successfully inserted a review"}, result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
