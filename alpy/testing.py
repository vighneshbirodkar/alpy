"""Testing utilities."""

import re
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


_docstring_none_msg = "docstring is `None`."


def create_test_class_from_md_code(docstring: str | None) -> type:
    """Create a unit test for markdown code blocks"""

    class _DocStringCodeTest(unittest.TestCase):
        """Create a subtest for each ```python...``` block in md."""

        def test_code_blocks(self) -> None:
            """Test each python code block found in the docstring."""
            # Extract code blocks from markdown
            if docstring is None:
                raise ValueError(_docstring_none_msg)

            # Pattern to match ```python...``` blocks
            pattern = r"```python\n(.*?)```"
            code_blocks = re.findall(pattern, docstring, re.DOTALL)

            # Create a subtest for each code block
            for i, code_block in enumerate(code_blocks):
                with self.subTest(block=i):
                    exec(code_block)  # noqa: S102

    return _DocStringCodeTest
