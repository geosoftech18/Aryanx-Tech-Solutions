interface CarousalBulletsProps{
    index:number
    current:number
}

const CarousalBullets:React.FC<CarousalBulletsProps> = (
    {
        current,
        index
    }
) => {
    return ( 
        <div
        key={index}
        className={`h-1 w-1  2xl:h-2 2xl:w-2 rounded-full transition-all duration-200 ${
          current === index + 1 ? "bg-black scale-[200%]" : "bg-gray-600"
        }`}
      />
     );
}
 
export default CarousalBullets;