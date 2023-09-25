export default function NotifyBox({msg, status}) {
  return (
    <div
        className={`p-2 rounded-lg ${!status ? "bg-red-error/20" : "bg-green-500/20"} mb-8`}
    >
        {
            msg
        }
    </div>
  )
}
