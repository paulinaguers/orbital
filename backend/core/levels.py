# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""The four alert levels and how to compare them.
Los cuatro niveles de alerta y cómo compararlos.
"""

GREEN, YELLOW, ORANGE, RED = "green", "yellow", "orange", "red"
LEVELS = [GREEN, YELLOW, ORANGE, RED]


def highest(*levels):
    """Returns the most serious level, ignoring None ("no level yet").
    Devuelve el nivel más grave, ignorando None ("todavía sin nivel").

    Used for the rule "the higher level wins" (two layers, shared boundaries,
    blocks and the overall status).
    Se usa para la regla "gana el nivel más alto" (dos capas, bordes
    compartidos, bloques y estado general).
    """
    present = [level for level in levels if level is not None]
    if not present:
        return None
    return max(present, key=LEVELS.index)
