import Image from "next/image";
import logo from "@/img/LogoFCI.png"


export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <Image
    
    src={logo}
      alt="Logo"
      height={500}
      width={150}

    />
  );
}
