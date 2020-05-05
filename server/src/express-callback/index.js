module.exports = function makeExpressCallabck (controller) {
  
  return (req, res) => {
    if (req.body) console.log(req.body);
    if (req.params) console.log(req.params);
    if (req.query) console.log(req.query);
    console.log(`Received a ${req.method} request from ${req.ip} for                ${req.url}`);
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      authUser: req.user ? req.user.user : {},
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(e => res.status(500).send({ error: 'An unkown error occurred.' }))
  }
}
