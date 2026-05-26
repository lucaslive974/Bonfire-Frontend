import Link from 'next/link'

export function Logo() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-sky-500 dark:text-sky-700">
        <Link href="/">Bonfire</Link>
      </h1>
    </div>
  )
}

export default function LogoCompleta() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-sky-500 dark:text-sky-700">
        <Link href="/">Bonfire</Link>
      </h1>
      <h2 className="text-bold dark:text-zinc-500">Autos de Infração</h2>
    </div>
  )
}
