"""# Hello world

We start by saying hello.

Write the following text in the right-hand side code editor
```python
print("Hello, World!")
```

To run the code, click on the `Run` button on the bottom right
and see what happens.
The program should display the output:
```
"Hello, World!"
```

Two important things happen when this code runs.

1. We define a string `"Hello World!"`. A String Python
is a sequence of characters in between the quotation marks `""`.
We will learn more about them soon.
2. We called the `print` function. A function is called by
specifying its name and then placing its arguments between
round brackets `()`. In our case, the argument was a string.
Unlike actual printing, in Python (and many other programming languages ),
print just means displaying things on the screen.


Try printing more things like so
```
print("Hello Alice")
print("Hello Boris")
print("Hello Charu")
```
Maybe you want to say hello to more friends. Use this as a chance
to familiarise yourself with the website interface.
"""

import platform
import unittest

if platform.system() != "Emscripten":
    from .testing import create_test_class_from_md_code

    CodeTest = create_test_class_from_md_code(__doc__)

if __name__ == "__main__":
    if platform.system() != "Emscripten":
        unittest.main()
