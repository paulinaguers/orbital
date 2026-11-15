# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""The four alert levels and how to compare them.
"""

GREEN, YELLOW, ORANGE, RED = "green", "yellow", "orange", "red"
LEVELS = [GREEN, YELLOW, ORANGE, RED]

# Measured, but the personal baseline could not be used (too few baseline
# values, or no spread). It is shown as "not evaluable", never as green.
NOT_EVALUABLE = "not_evaluable"


def highest(*levels):
    """Returns the most serious level, ignoring None ("no level yet").

    Used for the rule "the higher level wins" (two layers, shared boundaries,
    blocks and the overall status).
    """
    present = [level for level in levels if level in LEVELS]
    if not present:
        return None
    return max(present, key=LEVELS.index)
