import Image from 'next/image'
import logoIcon from '../../assets/icons/Logo.svg'

type Props = {
  size: number
}

export const Logo = ({ size }: Props) => {
  const iconSize = size * 0.7
  return (
    <div style={{ fontSize: size }} className="flex items-center font-medium ">
      Ж
      <Image
        src={logoIcon}
        alt="logo"
        width={iconSize}
        height={iconSize}
        style={{
          position: 'relative',
          top: iconSize * 0.07,
        }}
      />
      муш.kg
    </div>
  )
}
