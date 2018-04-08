# web2socket

Broadcasts data sent through web requests to all connected socket clients.

## Install

`npm i web2socket`

## Usage

Send web requests to the root URL of your running instance of *web2socket*.

GET query params or POST body will be broadcasted to all connected socket clients.

For example, if you send the following GET request:

http://localhost:3000?ip=192.168.0.27&name=ROCK

A message will be broadcasted to all connected socket clients containing:

`{ ip: '192.168.0.27', name: 'ROCK' }`

If you want to send the same data using JSON in a POST request you could make
the request to http://localhost:3000 and send:

```
{
	"ip": "192.168.0.27",
	"name": "METAL!"
}
```

Socket clients will receive exactly the same data.


Enjoy!
