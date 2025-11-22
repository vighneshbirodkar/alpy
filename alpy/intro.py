"""# Hello and welcome

Before we do useful work, we need to know how to get
the computer to show things on the screen. This
is done with the `print` function.

Type the following on the right and hit run, and see what happens.
```python
print("Hello")
```

Let's break down what happened. Unlike what it may first seem,
print does not have anything to do with printers. Instead, it
displays text on the screen.

The stuff between the round brackets `()` is the argument to the
function. In this case, we pass in the `string` `"Hello"`.
`string` is a term that Python uses to designate
a sequence of characters. A string can be encapsulated
by double quotes `""` or single quotes `''`

Let's print some more things. See if you can follow along on the right.
```python
print("Hello AlPy")
```

Instead of just printing (displaying things), we can also store
them for later use. Here, we store the name of a friend.

```python
friends_name = "Alice"
print("Hello " + friends_name)
```
In this case, `friends_name` is a variable. It is named so because
the value that it points to can change at any time. In Python,
variable names must start with a letter, and only ever contain
letters, numbers or an underscore(_).

What would happen when we run the following code? can you guess?
```python
friends_name = "Boris"
friends_name = "Charu"
print("Hello " + friends_name)
```

In Python, we can add strings. Below, we only add 3, but you can add as many as
you want.
```python
greeting = "Hello"
name = "Dominic"
print(greeting + " " + name)
```

We have only ever used one explicit function so far, `print`. There are many
more functions that Python gives us, but for now, let's try to
write our own. We will write a simple function called `say_hello`

```python
def say_hello(name):
    print("Hello " + name + ". It is a pleasure to meet you.")
```
Now we can use our function as many times as we want.

```python
say_hello("Boris")
say_hello("Alice")
say_hello("Charu")
```

This brings us to the end of our hello, happy programming.

"""

# TEST_BEGIN
import platform
import unittest


def _check() -> bool:
    return True


class PrintTest(unittest.TestCase):
    """Trivial test."""

    def test_noop(self) -> None:
        """Test no op."""
        _check()


if __name__ == "__main__":
    if platform.system() != "Emscripten":
        unittest.main()
