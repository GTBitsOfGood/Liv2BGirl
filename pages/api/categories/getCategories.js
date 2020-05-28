import { getCategories } from "../../../server/mongodb/actions/GroupCategory";

// @route   GET api/categories/getCategories
// @desc    Get all categories
// @access  Public
const handler = (req, res) =>
  getCategories()
    .then(categories =>
      res.status(200).json({
        success: true,
        payload: categories,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
