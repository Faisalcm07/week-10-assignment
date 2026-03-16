
import Link from "next/link"
import * as Separator from "@radix-ui/react-separator"
 
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Separator.Root decorative orientation="vertical" />
      <Link href="/movies">Movies</Link>
      <Separator.Root decorative orientation="vertical" />
      <Link href="/movies/new-movie">Add Movie</Link>
      <Separator.Root decorative orientation="vertical" />
      <Link href="/users/userPage">My Profile</Link>
    </nav>
  )
}