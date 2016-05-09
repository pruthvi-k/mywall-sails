/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  dashBoard: function (req, res) {
    return res.view('homepage');
  },
  userPage: function (req, res) {
    return res.view('pages/user');
  }
};
