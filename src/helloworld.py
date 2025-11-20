"""Testing print."""

import unittest

print("Hello workd")


class PrintTest(unittest.TestCase):
    """Test print."""

    def test_print(self) -> None:
        """Test print."""
        self.assertEqual("", "a" + "b")


if __name__ == "__main__":
    unittest.main()
