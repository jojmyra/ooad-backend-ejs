const express = require('express');
const CoinRouter = express.Router();
const Coin = require(`../models/Coin.model`)

CoinRouter.route('/').get(function (req, res) {
  Coin.find((err, coins) => {
     if(err){
       console.log(err);
     }
     else {
       res.render('index', {coins: coins});
     }
   });
});

CoinRouter.route('/create').get((req, res) => {
    res.render('create');
});

CoinRouter.route(`/post`).post((req, res) => {
  const coin = new Coin(req.body);
  console.log(coin);
  
  coin.save()
    .then(coin => {
      res.redirect(`/coins`);
    })
    .catch(err => {
      res.status(400).send(`unable to save to database`)
    })
})

CoinRouter.route('/edit/:id').get((req, res) => {
  const id = req.params.id
  Coin.findById(id, (err, coin) => {
      res.render('edit', {coin: coin})
  })
})

CoinRouter.route('/update/:id').post((req, res) => {
  Coin.findById(req.params.id, (err, coin) => {
    if (!coin)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      coin.name = req.body.name
      coin.price = req.body.price

      coin.save().then(coin => {
          res.redirect('/coins')
      })
      .catch(err => {
            res.status(400).send("unable to update the database")
      })
    }
  })
})

CoinRouter.route('/delete/:id').get((req, res) => {
  Coin.findByIdAndRemove({_id: req.params.id},
       (err, coin) => {
        if(err) res.json(err)
        else res.redirect('/coins')
    })
})

module.exports = CoinRouter;