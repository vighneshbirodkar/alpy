"""# Say Hello

We learnt in the previous lesson how to define functions.
Define a `goodbye` function, such that `goodbye("Erica")`
should print `See you later Erica`
and `goodbye("Freddie")` should print `See you later Freddie`.

"""

import platform

if platform.system() != "Emscripten":

    def goodbye(name: str) -> None:
        """Say hello."""
        print("See you later " + name)


# TEST_BEGIN
import io
import platform
import unittest
from contextlib import redirect_stdout


def _check() -> bool:
    f = io.StringIO()
    with redirect_stdout(f):
        goodbye("Erica")
        goodbye("Freddie")
    actual = f.getvalue().rstrip("\n")
    print(actual)
    expected = "See you later Erica\nSee you later Freddie"
    error_msg = f"Expected `{expected}` but printed message was `{actual}`"
    assert actual == expected, error_msg  # noqa: S101
    return True


class PrintTest(unittest.TestCase):
    """Test print."""

    def test_print(self) -> None:
        """Test print."""
        _check()


if __name__ == "__main__":
    if platform.system() != "Emscripten":
        unittest.main()
