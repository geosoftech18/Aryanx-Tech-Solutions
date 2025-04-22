import Image from "next/image";

const Partners = () => {
  return (
    <div className="grid grid-cols-6 px-28  gap-5">
      {Array.from({ length: 12 }, (_, index) => (
        <Image
          key={index}
          alt={`Partner ${index + 1}`}
          width={100}
          height={100}
          src={`/accenture.png`}
        />
      ))}
    </div>
  );
};

export default Partners;


