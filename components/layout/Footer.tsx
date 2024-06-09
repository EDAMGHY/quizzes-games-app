import { appInfo, socials } from "@/static";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className='border-t py-5 border-border/80'>
      <div className='container space-y-6'>
        <div className='flex items-center gap-5 justify-between'>
          <h1 className='text-3xl font-bold'>{appInfo.name}</h1>
          <ul className='flex justify-start items-center gap-2'>
            {socials?.map((social, index) => (
              <li data-date={social?.id} key={social?.id || index + 1}>
                <Link
                  target='_blank'
                  className='bg-gray-800 inline-block p-1 rounded dark:bg-white dark:text-gray-800 text-white'
                  href={social?.href || "#."}
                >
                  {social?.icon && <social.icon size={18} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className='h-px w-full bg-border/80' />
        <p className='text-center'>
          Copyright for <b>{appInfo.name}</b> &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
