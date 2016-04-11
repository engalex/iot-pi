# IoT, Watson, and Raspberry Pi (3) Experiments

This repository is where I will keep and progress through a few iterations of "experiments" relating to my new Raspberry Pi 3, and IoT and IBM Watson and its related services.

## What is IoT?

IoT is short for the [Internet of Things](https://en.wikipedia.org/wiki/Internet_of_Things). While this may seem like a goofy name, a descriptive approach is probably best for those who haven't yet put it in context. The short version is that this is what has become of "wifi enabled" everything, just not _necessarily_ with wifi (some connection, generally to [**the Internet**](https://twitter.com/edm00se/status/716318922069393408)).

### High Connectivity

The modern, digital age has given rise to a great increase of connectivity. This goes beyond nearly every personal device being Internet connected, but the capabilities that ride along with it. The advance of readily available APIs and the near ubiquity of the connectivity to them means that all sorts of things _can_ be enabled by their power.

### Data and Services as Fact

Generally cloud driven, the data connections (APIs) that are now nearly ubiquitous are able to be taken at a high level of certainty. It may be only a greater than 99% uptime, but that's nearly 100% and means we can take for granted their availability, with downtime being the exception. Anything can be added as a high availability API, especially in a world with great options in the [_PaaS_](https://en.wikipedia.org/wiki/Platform_as_a_service) space. Even more data and services are available, able to be created by nearly anyone, and can be taken as the norm.

### Smart Things

The result of all of this is to make "smart things". Things, especially ones that would otherwise not necessarily be interconnected, with a high degree of connection, availability to receive and publish data, and do higher levels of computation with. I'm going to treat the term "IoT device" to mean this sort of "smart thing". So, the obvious questions are:

* what **can** be an IoT device
* what **should** be an IoT device (and what **shouldn't**)
* what **can** be accomplished as an IoT device
* what **should** be an IoT device (and what **shouldn't**)
* what is **most advantageous** to people / a person as an IoT device

I believe that last bullet to be the biggest area of exploration, at the moment. On the whole, we're still coming into focus with the realizations of what can/can't be and what is/isn't a good idea. So the advent of the advantage, fitting with the "see a need, fill a need" adage, is what I believe will yield the most traction and be the most enlightening.

That's the spirit of this series of "experiments" and hopefully will be the guide to my observations and lessons learned.

## History

How did I get started down this path? I have a passion for coding, open source, GitHub, Node, and cloud / PaaS implementations. I've also done a couple of small projects with Raspberry Pis before, making this a bit of a win, all around. Once I saw that IBM was giving me an excuse to play around with the 3rd edition of the Raspberry Pi, all so I could familiarize myself with their Watson IoT platform on Bluemix, I was interested.

I first heard about this giveaway + 30 Bluemix trial account, courtesy of a re-tweet I saw; here's the original:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Did you see we&#39;re giving away 1000 <a href="https://twitter.com/hashtag/RaspberryPi?src=hash">#RaspberryPi</a> &amp; a free trial of IBM Watson <a href="https://twitter.com/hashtag/IoT?src=hash">#IoT</a> Platform? <a href="https://t.co/V2CvZCaIfD">https://t.co/V2CvZCaIfD</a> <a href="https://t.co/LZ8mRyv42W">pic.twitter.com/LZ8mRyv42W</a></p>&mdash; Chris O&#39;Connor (@ChrisROConnor) <a href="https://twitter.com/ChrisROConnor/status/704371556156207104">February 29, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Updates

Stay tuned for updates. I'll summarize the "experiments" as they're complete on this read me. I'll be chronicling my efforts as I work, in the mini blog attached to this repository on GitHub: [edm00se.github.io/iot-pi](https://edm00se.github.io/iot-pi).

## License

The code contained in this repository is licensed under the MIT License (MIT). You may use, alter, and redistribute the code herein (with citation), while expecting no warranty for its use.

The MIT License (MIT):

Copyright &copy; 2016 Eric McCormick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.