"""Testing print."""

import sys
import unittest

from alpy.environemt_setup import environment_setup

environment_setup()

print("Hello world")


class PrintTest(unittest.TestCase):
    """Test print."""

    def test_print(self) -> int:
        """Test print."""
        print("Hi", sys.stdout)
        self.assertEqual("", "a" + "b")


if __name__ == "__main__":
    unittest.main()
