import Link from "next/link";
import { ModeToggle } from "@/components/ui";
import { appInfo, menus } from "@/static";

export const Navbar = () => {
  return (
    <nav className='sticky z-[50] border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40 text-foreground top-0 left-0 w-full py-3'>
      <div className='container flex justify-between items-center'>
        <Link href='/'>
          <h1 className='text-3xl font-bold'>{appInfo.name}</h1>
        </Link>
        <div className='flex items-center gap-4 justify-end'>
          <ul className='flex justify-start items-center gap-4'>
            {menus?.map((menu, index) => (
              <li key={menu?.id || index + 1} className='group'>
                <Link
                  className='inline-flex gap-2 items-center opacity-60 group-hover:opacity-100'
                  href={menu?.href || "#."}
                >
                  {menu.icon && <menu.icon size={18} />}
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
