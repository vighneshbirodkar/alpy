"""Testing utilities."""

import unittest
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Callable


def create_test_class_from_function(
    func: Callable[[], bool],
) -> type:
    """Create a unit test class that tests a simple function."""

    class _SingleFunctionTest(unittest.TestCase):
        def test_run(self) -> None:
            self.assertTrue(func())

    return _SingleFunctionTest
