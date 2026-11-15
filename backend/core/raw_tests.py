# Generated with SI assistance (Claude), reviewed by the ORBITAL team.
"""Turns the raw results of the in-app tests into the values the core uses.

The screen only records raw data (reaction times, marked cells); the core
scores them here.
"""

from backend.core.thresholds import THRESHOLDS


def count_pvt_lapses(reaction_times_ms):
    """Counts lapses in a brief PVT session (Basner 2011: 355 ms).

    The 355 ms cut is validated for the 3-minute PVT-B. The app's 1-minute
    demo is a brief PVT-inspired test: its lapse counts are only comparable
    with the astronaut's own sessions of the same length (experimental).

    A response of exactly 355 ms counts as a lapse (">=", as in
    escalas-y-protocolos.md): PROVISIONAL, open decision PVT-355.
    """
    cut = THRESHOLDS["pvt_lapses"]["lapse_ms_3min"]
    return sum(1 for rt in reaction_times_ms if rt >= cut)


def score_pvt_session(reaction_times_ms, stimuli_count):
    """Scores one brief PVT session, counting unanswered stimuli as lapses.

    reaction_times_ms: answered stimuli only; stimuli_count: all stimuli shown.
    Returns lapses (slow + omissions), omissions, lapse_rate and `valid`
    (False if too few stimuli were shown: the session is not evaluable).
    """
    t = THRESHOLDS["pvt_lapses"]
    omissions = stimuli_count - len(reaction_times_ms)
    lapses = count_pvt_lapses(reaction_times_ms) + omissions
    valid = stimuli_count >= t["min_valid_stimuli"]
    return {"stimuli": stimuli_count, "answered": len(reaction_times_ms), "omissions": omissions,
            "lapses": lapses, "lapse_rate": lapses / stimuli_count if stimuli_count else None,
            "valid": valid}


def classify_amsler(today_cells, previous_cells, sudden_change=False):
    """Category of an Amsler result for one eye, compared with the last test.

    today_cells / previous_cells: sets of (row, col) marked as distorted;
    previous_cells is None if there is no earlier test. `sudden_change` is the
    astronaut's answer to "did this appear suddenly?" (red).
    A change is "confirmed" only if today's cells overlap the previous ones
    (the same area persists); a distortion somewhere else waits for a retest.
    Returns a category of alert_texts.md §6 (all Proposal).
    """
    if sudden_change:
        return "sudden_loss_or_distortion"
    if not today_cells:
        return "no_change" if not previous_cells else "change_not_repeated"
    if not previous_cells or not (today_cells & previous_cells):
        return "change_awaiting_retest"
    if len(today_cells) > len(previous_cells) and previous_cells <= today_cells:
        return "area_growing"
    return "change_confirmed"
