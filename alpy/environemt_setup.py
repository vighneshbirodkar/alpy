"""Setup utilities for browser based code."""

import sys
from io import StringIO


def environment_setup() -> None:
    """Create environment for code exceution in js."""
    sys.stdout = StringIO()
