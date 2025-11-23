"""# Numbers

Computers are very good at numbers. Here is how you
perform the basic math operations, like addition

```python
a = 2
b = 1
c = a + b
```

The full list of operations supported is:

| Equation    | Python code    | Example       | Description     |
| ------------|----------------|---------------|-----------------|
| a + b       | a + b          | 12  + 2 = 14  | Addition        |
| a - b       | a - b          | 12  - 2 = 10  | Subtraction     |
| a x b       | a * b          | 12  * 2 = 24  | Multiplication  |
| a ÷ b       | a / b          | 12  / 2 = 6.0 | Division        |
| a ^ b       | a ** b         | 12 ** 2 = 144 | Exponentiation  |
| a mod b     | a % b          | 12  % 5 = 2   | Modulo/Remainder|
| a ÷ b       | a // b         | 12 // 5 = 2   | Floor Division  |


Just as in regular mathematics, Python statements follow
[Order of operations](https://en.wikipedia.org/wiki/Order_of_operations).
So 4 + 6 / 2 = 7, not 5.

Now, let's do something useful with these math operations.
Read these 2 lines of code below.
```python
def my_function(x):
    return (x + 5) * 2
```

Just like the `goodbye` function we saw earlier, we created a new function
called `my_function`. But instead of printing, we are returning with
the `return` keyword. This means that the place in the code where
`my_function` is called, will receive the value `(x + 5) * 2`.

Therefore `my_function(5) = 27` and `my_function(10) = 52`.

For this exercise, we will try to implement the following function
called `f` , defined as `f(x) = (x^2) + 15x + 6`.

Try writing this on the right, and see if it can pass the test.

"""

import platform

if platform.system() != "Emscripten":

    def f(x: float) -> float:
        """Polynomial"""
        return x**2 + 15 * x + 6


# TEST_BEGIN
import platform
import unittest


def _test() -> bool:
    assert f(0) == 6, f"f(0) should be 6, but was {f(0)}"  # noqa: S101 PLR2004
    assert f(1) == 22, f"f(1) should be 22, but was {f(1)}"  # noqa: S101 PLR2004
    assert f(10) == 256, f"f(10) should be 256, but was {f(10)}"  # noqa: S101 PLR2004
    print("Test passed.")
    return True


if platform.system() != "Emscripten":
    from .testing import create_test_class_from_function

    NumbersTest = create_test_class_from_function(_test)

if __name__ == "__main__":
    if platform.system() != "Emscripten":
        unittest.main()
