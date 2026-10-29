// Evaluate sustained frame delivery after warmup, not a single long task.
export function exceedsFrameBudget(intervals: number[]) {
  return (
    intervals.length >= 60 &&
    intervals.reduce((sum, value) => sum + value, 0) / intervals.length > 90
  );
}
