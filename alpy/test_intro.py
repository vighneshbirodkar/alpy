"""User can do anything, so test trivially passes."""

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
