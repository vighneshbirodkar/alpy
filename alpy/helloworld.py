"""# Say Hello

Define a function called `hello`. Make it print `"Hello Python!!"`

"""

import platform

if platform.system() != "Emscripten":

    def hello() -> None:
        """Say hello."""
        print("Hello Python!!")


# TEST_BEGIN
import io
import platform
import unittest
from contextlib import redirect_stdout


def _check() -> bool:
    f = io.StringIO()
    with redirect_stdout(f):
        hello()
    actual = f.getvalue().rstrip("\n")
    print(actual)
    expected = "Hello Python!!"
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
