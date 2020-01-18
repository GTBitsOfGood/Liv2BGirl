import { exampleAction } from '../../server/actions/example';

// @route   POST api/example
// @desc    Example API
// @access  Public
const handler = (req, res) => exampleAction()
  .then((text) => res.status(201).json({
    success: true,
    payload: text,
  }))
  .catch(() => res.status(201).json({
    success: false,
    message: 'Failed to run action!',
  }));

export default handler;
