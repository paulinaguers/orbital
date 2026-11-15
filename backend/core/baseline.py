# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Personal baseline and z-score.

The baseline uses flight days 4 to 10 (thresholds.py) with the mean and the
population standard deviation (statistics.pstdev), as proposed by thread C.
"""

import statistics

from backend.core.thresholds import THRESHOLDS

BASELINE_RULES = THRESHOLDS["baseline"]


def is_baseline_day(flight_day):
    """Tells if a flight day belongs to the baseline window (days 4-10).
    """
    return BASELINE_RULES["first_flight_day"] <= flight_day <= BASELINE_RULES["last_flight_day"]


def baseline_is_ready(flight_day):
    """True once the baseline window is over, so z-scores can be used.
    """
    return flight_day > BASELINE_RULES["last_flight_day"]


def calculate_baseline(values, min_values=None):
    """Mean and population standard deviation of the baseline values.

    Receives a list of numbers (None values are skipped) and the minimum
    number of valid values (default: thresholds.py, 5 of 7 days).
    Returns (mean, std_dev), or None if there are too few values: then the
    measurement is "not evaluable" against the baseline, never green.
    """
    if min_values is None:
        min_values = BASELINE_RULES["min_daily_observations"]
    clean = [value for value in values if value is not None]
    if len(clean) < max(min_values, 2):
        return None
    return statistics.mean(clean), statistics.pstdev(clean)


def calculate_z_score(value, mean, std_dev):
    """Measures how far a reading is from the astronaut's personal baseline.

    Returns the z-score: 0 = usual; 2 = far from usual. Returns None when the
    baseline has no spread (std_dev 0), so the core never divides by 0.
    """
    if value is None or std_dev is None or std_dev == 0:
        return None
    return (value - mean) / std_dev


def baseline_band(mean, std_dev):
    """Usual range shown on screen: mean ± the yellow z cut (1.5).
    """
    width = THRESHOLDS["deviation"]["yellow_abs_z_min"] * std_dev
    return mean - width, mean + width
