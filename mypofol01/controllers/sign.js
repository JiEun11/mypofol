module.exports = {
  signin: (req, res, next) => {
      res.status(200).render('main/signin');
  },
  join: (req, res, next) => {
      res.status(200).render('sign/joinsuccess');
  }    
}