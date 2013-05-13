#### Okuda

Yes, that's named after the guy who designed LCARS. Who said we can't be pretentious?

Anyway, the goal of this project is to write a row-centric graphing library. Most tools,
(and, in particular, the Google Chart Tools) support many types of graphs but require
programmers to effectively write code for a spreadsheet application, generating column
headers and then tracking rows as lists.

For this project, I hoped to simply use native JavaScript objects ordered by property
name, to better handle cases in which data are missing or unknown. This, I feel, more
adequately provides a mapping onto the various abstractions programmers are used to when
writing software. This means that constructing objects is relatively straightforward:

```
var data = [
	{ x: 0.5, y: 12 },
	{ x: 0.2, y: 14 },
	// ...
];
```

For the same reason, I've tried to make the graph constructor very simple — just call `Okuda.graph` to render a graph on your `<canvas>` object. In this regard Okuda is very similar to Chart Tools in that making a graph, once data are imported, is relatively straightforward.
	
```
Okuda.graph({
	data: items,
	// sequential: true // uncomment if data should be connected with lines.
	dependent: [
		{
			field: "y",
			label: "Controls"
		}
	],
	independent: [
		{
			field: "x",
			label: "Measurement"
		},
	],
	canvas: document.getElementsByTagName('canvas')[0]
});
```

Please contact me if you are considering using this for something. As it stands, this is little more than a side-project and has quite a few rough spots.

##### License

Copyright (c) 2013 Jeremy Archer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

