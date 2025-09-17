import Image from 'next/image';

const BrandLogo = () => {
  return (
    <div className="relative">
      {/* Purple logo for light theme */}
      <Image
        src="/brand-logo-purple.png"
        alt="Tokn Logo"
        width={140}
        height={140}
        className="block dark:hidden transition-opacity duration-200"
        priority
      />
      {/* White logo for dark theme */}
      <Image
        src="/brand-logo-white.png"
        alt="Tokn Logo"
        width={140}
        height={140}
        className="hidden dark:block transition-opacity duration-200"
        priority
      />
    </div>
  );
};

export default BrandLogo;
