const STATS = [
  { index: "01", value: "95%", label: "Performance" },
  { index: "02", value: "80%", label: "Engagement" },
  { index: "03", value: "60%", label: "Growth" },
];

/** Three restrained glass statistic panels. */
export default function Stats() {
  return (
    <div className="fz-stats" data-stats>
      {STATS.map((s) => (
        <div className="fz-stat" data-stat key={s.index}>
          <span className="fz-stat-index">{s.index}</span>
          <span className="fz-stat-value">{s.value}</span>
          <span className="fz-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
