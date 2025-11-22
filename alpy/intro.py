"""# Hello and welcome

Before we do useful work, we need to know how to get
the computer to show things on the screen. This
is done with the `print` function.

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
