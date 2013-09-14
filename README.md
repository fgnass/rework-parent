## rework-parent [![Build Status](https://travis-ci.org/fgnass/rework-parent.png)](https://travis-ci.org/fgnass/rework-parent)

[Rework](https://github.com/visionmedia/rework) plugin that adds support for
a SASS-like parent selector. Since in plain CSS rules can't be nested, the `&`
simply refers to the previous selector:

### Example

```css
.foo {
  color: black;
}
&:hover {
  color: blue;
}
&:visited {
  color: pink;
}
```

Yields:

```css
.foo {
  color: black;
}
.foo:hover {
  color: blue;
}
.foo:visited {
  color: pink;
}
```

Both `:hover` and `:visited` refer to the `.foo` selector because it doesn't
contain any ampersand. Sometimes this is not what you want. If you want to
reference a preceding selector that itself contains _n_ ampersands you can
use _n+1_ `&` chars to refer to it:

```css
.red {
  color: red;
}
&.bold {
  font-weight: bold;
}
&&:hover {
  color: blue;
}
.disabled & {
  background: silver;
}
```

This yields:

```css
.red {
  color: red;
}
.red.bold {
  font-weight: bold;
}
.red.bold:hover {
  color: blue;
}
.disabled .red {
  background: silver;
}
```


### Usage

```js
  var rework = require('rework');
  var parent = require('rework-parent');

  rework(css).use(parent);
```

### The MIT License (MIT)

Copyright (c) 2013 Felix Gnass

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
