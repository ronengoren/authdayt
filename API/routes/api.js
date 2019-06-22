// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

/*  This is a sample API route. */

// router.get("/:resource", (req, res) => {
//   res.json({
//     confirmation: "success",
//     resource: req.params.resource,
//     query: req.query // from the url query string
//   });
// });

router.post("/signup", (req, res) => {
  turbo
    .create("user", req.body)
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

router.post("/login", (req, res) => {
  turbo
    .login(req.body)
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

const validResources = ["message"];

router.post("/message", function(req, res) {
  console.log(req.body);
  turbo
    .create("message", req.body)
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
      return;
    })
    .catch(err => {
      console.log(err);
      res.json({
        confirmation: "fail",
        message: "Sorry, something went wrong"
      });
      return;
    });
});

router.get("/:resource", (req, res) => {
  const { resource } = req.params;
  const { query } = req;
  // res.json({
  //   confirmation: "success",
  //   resource: req.params.resource,
  //   id: req.params.id,
  //   query: req.query // from the url query string
  // });
  if (validResources.indexOf(resource) < 0) {
    res.json({
      confirmation: "fail",
      message: "No such resource"
    });
    return;
  }
  turbo
    .fetch(resource, query)
    .then(data => {
      res.json({
        confirmation: "success",
        data: data
      });
      return;
    })
    .catch(err => {
      console.log(err);
      res.json({
        confirmation: "fail",
        message: err.message
      });
      return;
    });
});
router.get("/message/me", function(req, res) {
  const resource = "message";
  const { query } = req;

  const messages = [];
  const first = {
    toUser: query.toUser,
    fromUser: query.fromUser
  };
  const second = {
    fromUser: query.toUser,
    toUser: query.fromUser
  };

  turbo
    .fetch(resource, first)
    .then(data => {
      data.forEach((mes, i) => {
        messages.push(mes);
      });
      return turbo.fetch(resource, second);
    })
    .then((data, i) => {
      data.forEach((mes, i) => {
        messages.push(mes);
      });
      res.json({
        confirmation: "success",
        data: messages
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        confirmation: "fail",
        message: err.message
      });
      return;
    });
});
// router.get("/:resource/:id", (req, res) => {
//   res.json({
//     confirmation: "success",
//     resource: req.params.resource,
//     id: req.params.id,
//     query: req.query // from the url query string
//   });
// });

module.exports = router;
