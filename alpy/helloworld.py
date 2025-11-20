"""Testing print."""

import sys
import unittest

from alpy.environemt_setup import environment_setup

environment_setup()

print("Hello Python!!")


class PrintTest(unittest.TestCase):
    """Test print."""

    def test_print(self) -> None:
        """Test print."""
        self.assertEqual(
            sys.stdout.getvalue(),
            "Hello Python!!\n",
        )


if __name__ == "__main__":
    unittest.main()
