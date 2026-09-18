export default function StatCard({
  title,
  value,
  suffix,
  suffixColor,
  icon: Icon,
  iconColor,
  status = false,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#1b1b1d] p-4">
      <div className="flex flex-col">
        <span className="text-sm  tracking-wider text-[#958da1]">
          {title}
        </span>

        {status ? (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-medium">
              {value}
            </span>
          </div>
        ) : (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">
              {value}
            </span>

            {suffix && (
              <span className={`font-mono text-xs ${suffixColor}`}>
                {suffix}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2a2a2c]">
        <Icon name={Icon} size={18} className={`${iconColor}`} />
      </div>
    </div>
  );
}