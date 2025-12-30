const mongoose = require('mongoose');
mongoose.connect = jest.fn().mockResolvedValue({});
mongoose.disconnect = jest.fn().mockResolvedValue({});
mongoose.connection = {
  readyState: 1,
  close: jest.fn().mockResolvedValue({})
};

module.exports = mongoose;
