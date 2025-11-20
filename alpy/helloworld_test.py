"""Testing print."""

from alpy.helloworld import hello  # noqa:I001

# TEST_BEGIN
import io
import unittest
from contextlib import redirect_stdout
import platform


def _check() -> bool:
    f = io.StringIO()
    with redirect_stdout(f):
        hello()
    actual = f.getvalue().rstrip("\n")
    print(actual)  # noqa:T201
    expected = "Hello Python!!"
    error_msg = f"Expected `{expected}` but printed message was `{actual}`"
    assert actual == expected, error_msg  # noqa: S101
    return True


# TEST_BEGIN
class PrintTest(unittest.TestCase):
    """Test print."""

    def test_print(self) -> None:
        """Test print."""
        _check()


if __name__ == "__main__":
    if platform.system() != "Emscripten":
        unittest.main()
